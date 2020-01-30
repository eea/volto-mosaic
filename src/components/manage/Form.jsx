// import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keys, map, mapValues, omit, uniq, without } from 'lodash';
import { Button, Form as UiForm, Grid, List, Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { Portal } from 'react-portal';

import { Field, Icon, SidebarPortal, Toast } from '@plone/volto/components'; // EditBlock
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import '../css/edit.css';
import '../css/view.css';

import {
  rowHeight,
  breakpoints,
  screenSizes,
  zoomClassNames,
  zoomCoeficients,
} from '../../constants';

import BlockEditor from './BlockEditor';
import LayoutToolbar from './LayoutToolbar';
import { BlockViewWrapper } from './../theme/View';

import deleteIcon from '@plone/volto/icons/delete.svg';
import editIcon from '@plone/volto/icons/editing.svg';

import { blocks } from '~/config';
import { changeSidebarState } from 'volto-sidebar/actions';
import { connect } from 'react-redux';

import _ from 'lodash';

import { SizeMe } from 'react-sizeme';

import RGL from 'react-grid-layout';

import { TemplatingToolbar } from 'volto-sidebar/LayoutTemplating';

// import move from 'lodash-move';
// import aheadSVG from '@plone/volto/icons/ahead.svg';
// import clearSVG from '@plone/volto/icons/clear.svg';
const ReactGridLayout = RGL;

const screens = Object.keys(screenSizes).map(k => {
  return { key: k, text: screenSizes[k], value: k };
});

const messages = defineMessages({
  addBlock: {
    id: 'Add block...',
    defaultMessage: 'Add block...',
  },
  required: {
    id: 'Required input is missing.',
    defaultMessage: 'Required input is missing.',
  },
  minLength: {
    id: 'Minimum length is {len}.',
    defaultMessage: 'Minimum length is {len}.',
  },
  uniqueItems: {
    id: 'Items must be unique.',
    defaultMessage: 'Items must be unique.',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  thereWereSomeErrors: {
    id: 'There were some errors.',
    defaultMessage: 'There were some errors.',
  },
});

// Instead of Object.fromEntries
function fromEntries(iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
}

export function getBlockById(formData, id) {
  const blocksFieldname = getBlocksFieldname(formData);
  const res = formData[blocksFieldname]?.[id];
  return res;
}

function fallbackLayoutFromData(formData, ids) {
  // create a default layout based on existing blocks

  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

  const order = formData[blocksLayoutFieldname].items || [];
  const data = formData[blocksFieldname];

  const fallbackLayout = [
    {
      // provide default block for title
      h: 1,
      i: ids.title,
      w: 12,
      x: 0,
      y: 0,
    },
    {
      // provide default block for text
      h: 3,
      i: ids.text,
      w: 12,
      x: 0,
      y: 1,
    },
  ];

  const validIds = order.filter(i => {
    return Object.keys(data).indexOf(i) > -1;
  });
  const res = validIds.map((el, ix) => {
    return {
      w: 12,
      h: ix === 0 ? 2 : 4,
      x: 0,
      y: ix === 0 ? 0 : 2 + (ix - 1) * 4,
      i: el,
    };
  });

  return res || fallbackLayout;
}

class Form extends Component {
  static propTypes = {
    schema: PropTypes.shape({
      fieldsets: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.arrayOf(PropTypes.string),
          id: PropTypes.string,
          title: PropTypes.string,
        }),
      ),
      properties: PropTypes.objectOf(PropTypes.any),
      definitions: PropTypes.objectOf(PropTypes.any),
      required: PropTypes.arrayOf(PropTypes.string),
    }),
    formData: PropTypes.objectOf(PropTypes.any),
    pathname: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    submitLabel: PropTypes.string,
    resetAfterSubmit: PropTypes.bool,
    title: PropTypes.string,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    loading: PropTypes.bool,
    hideActions: PropTypes.bool,
    description: PropTypes.string,
    visual: PropTypes.bool,
    blocks: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    description: null,
    error: null,
    formData: null,
    hideActions: false,
    loading: null,
    onCancel: null,
    onSubmit: null,
    pathname: '',
    resetAfterSubmit: false,
    schema: {},
    submitLabel: null,
    blocks: [],
    title: null,
    visual: false,

    preview: false,
    // Grid props
    className: 'mosaic-edit-layout',
    // cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    // cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
    cols: 12,
    rowHeight: rowHeight,
    margins: 0,
    layoutWidth: null, // preview responsive layout width
    activeScreenSize: 'lg', // 'desktop' is the default screen size

    payload: null, // blockData that will be saved
  };

  constructor(props) {
    super(props);

    if (__SERVER__) {
      this.state = {};
      return;
    }

    const ids = {
      title: uuid(),
      text: uuid(),
    };
    let { formData } = props;
    const blocksFieldname = getBlocksFieldname(formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

    if (formData === null) {
      // get defaults from schema
      formData = mapValues(props.schema.properties, 'default');
    }
    // defaults for block editor; should be moved to schema on server side
    if (!formData[blocksLayoutFieldname]) {
      formData[blocksLayoutFieldname] = {
        items: [ids.title, ids.text],
      };
    }
    if (!formData[blocksFieldname]) {
      formData[blocksFieldname] = {
        [ids.title]: {
          '@type': 'title',
          mosaic_block_title: 'title block',
        },
        [ids.text]: {
          '@type': 'text',
          mosaic_block_title: 'text block',
        },
      };
    }

    const activeScreenSize = this.props.activeScreenSize;
    // TODO: rewrite with ? operator
    const activeMosaicLayout =
      (this.props.formData &&
        this.props.formData.blocks_layout &&
        this.props.formData.blocks_layout.mosaic_layout &&
        this.props.formData.blocks_layout.mosaic_layout[activeScreenSize]) ||
      fallbackLayoutFromData(formData, ids);

    if (!formData[blocksLayoutFieldname].mosaic_layout) {
      formData[blocksLayoutFieldname].mosaic_layout = {
        lg: activeMosaicLayout,
      };
    }

    const items = formData[blocksLayoutFieldname].items || [];
    const refs = items.map(id => [id, React.createRef()]);

    this.state = {
      formData,
      margins: this.props.formData.blocks_layout.margins || 0,
      errors: {},
      cols: 12,
      availableScreens: screens,
      layoutWidth: this.props.layoutWidth,
      activeScreenSize,
      activeMosaicLayout,
      dirtyLayout: false,
      refs: fromEntries(refs),
      blockHeights: {},
      zoom: '100%',
    };

    // this.onMoveBlock = this.onMoveBlock.bind(this);
    // this.onSelectBlock = this.onSelectBlock.bind(this);
    // this.onDeleteBlock = this.onDeleteBlock.bind(this);
    // this.onFocusPreviousBlock = this.onFocusPreviousBlock.bind(this);
    // this.onFocusNextBlock = this.onFocusNextBlock.bind(this);
    // this.handleKeyDown = this.handleKeyDown.bind(this);
    // this.onEditBlock = this.onEditBlock.bind(this);
    // this.renderBlockPreview = this.renderBlockPreview.bind(this);
    // this.onDragStart = this.onDragStart.bind(this);
    // this.onDrag = this.onDrag.bind(this);
    // this.onResize = this.onResize.bind(this);
    // this.onResizeStart = this.onResizeStart.bind(this);

    this.onDragStop = this.onDragStop.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);

    this.onChangeField = this.onChangeField.bind(this);
    this.onMutateBlock = this.onMutateBlock.bind(this);
    this.onAddBlock = this.onAddBlock.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.createElement = this.createElement.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleCloseEditor = this.handleCloseEditor.bind(this);
    this.handleLayoutToolbar = this.handleLayoutToolbar.bind(this);
    this.onShowBlock = this.onShowBlock.bind(this);

    // hack
    this.props.inputRef.current = this;
  }

  handleOpen(blockid) {
    this.props.changeSidebarState(true);
    this.setState({ showModal: true, currentBlock: blockid, blockHeights: {} });
  }

  handleCloseEditor(blockData) {
    this.props.changeSidebarState(false);
    if (!blockData) {
      this.setState({
        showModal: false,
        currentBlock: null,
      });
      return;
    }

    const blockid = this.state.currentBlock;

    const formData = this.state.formData;
    const blocksFieldname = getBlocksFieldname(formData);

    this.setState(
      {
        formData: {
          ...this.state.formData,
          [blocksFieldname]: {
            ...this.state.formData[blocksFieldname],
            [blockid]: blockData || null,
          },
        },
        showModal: false,
        preview: true,
      },
      () => {
        console.debug('state after handleCloseEditor', this.state);
      },
    );
  }

  onShowBlock(blockid, height) {
    const formData = this.state.formData;

    const blocksFieldname = getBlocksFieldname(formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
    const layoutField = formData[blocksLayoutFieldname];
    const activeScreenSize = this.state.activeScreenSize || 'lg';
    const blockData = formData[blocksFieldname][blockid];

    const sizing = blockData.mosaic_box_sizing || 'manual';

    let ix, lh;
    switch (sizing) {
      case 'fit-content':
        this.setState(
          (state, props) => {
            const activeMosaicLayout = JSON.parse(
              JSON.stringify(state.activeMosaicLayout),
            );
            lh = Math.ceil(height / this.props.rowHeight);
            ix = activeMosaicLayout.indexOf(
              activeMosaicLayout.find(el => {
                return el.i === blockid;
              }),
            );
            activeMosaicLayout[ix].h = lh;
            return {
              formData: {
                ...state.formData,
                [blocksLayoutFieldname]: {
                  ...layoutField,
                  mosaic_layout: {
                    ...layoutField.mosaic_layout,
                    [activeScreenSize]: activeMosaicLayout,
                  },
                },
              },
              activeMosaicLayout,
            };
          },
          () => {
            console.debug('height of node', height, lh, blockid, this.state);
          },
        );
        break;

      // case 'min-height':
      //   // TODO: get minimum block height from settings, trigger layout update
      //   const type = formData['@type'].toLowerCase();
      //   const minHeight = blocks.blocksConfig[type].height || 100;
      //   height = Math.ceil(minHeight / this.props.rowHeight);
      //   ix = activeMosaicLayout.indexOf(
      //     activeMosaicLayout.find(el => {
      //       return el.i === blockid;
      //     }),
      //   );
      //   activeMosaicLayout[ix].h = height;
      //   break;
      case 'fill-space':
        break;
      case 'manual':
        break;
      default:
        break;
    }
  }

  onLayoutChange(newLayout) {
    console.debug('on layout change');
    const formData = this.state.formData;
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
    const layoutField = formData[blocksLayoutFieldname];
    const mosaic_layout = layoutField.mosaic_layout || {};

    const size = this.state.activeScreenSize;

    // Layout hasn't been created yet
    if (Object.keys(mosaic_layout).indexOf(size) === -1) {
      this.setState({
        activeMosaicLayout: newLayout,
      });
      return;
    }

    this.setState(
      (state, props) => {
        return {
          activeMosaicLayout: newLayout,
          formData: {
            ...state.formData,
            [blocksLayoutFieldname]: {
              ...state.formData[blocksLayoutFieldname],
              mosaic_layout: {
                ...state.formData[blocksLayoutFieldname].mosaic_layout,
                [size]: newLayout,
              },
            },
          },
        };
      },
      () => {
        console.debug('Set state on change layout ' + size, this.state);
      },
    );
  }

  onLayoutSave(breakpoint) {
    const formData = this.state.formData;
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
    const layoutField = formData[blocksLayoutFieldname];
    const mosaic_layout = layoutField.mosaic_layout || {};

    mosaic_layout[
      breakpoint ? breakpoint : 'lg'
    ] = this.state.activeMosaicLayout;

    this.setState(
      {
        // activeMosaicLayout: mosaic_layout,
        formData: {
          ...this.state.formData,
          blocks_layout: {
            ...this.state.formData.blocks_layout,
            mosaic_layout,
          },
        },
      },
      () => {
        console.debug('Set state on layout save', this.state);
      },
    );
  }

  onLayoutDelete(breakpoint) {
    const formData = this.state.formData;
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
    const layoutField = formData[blocksLayoutFieldname];
    const mosaic_layout = layoutField.mosaic_layout || {};

    delete mosaic_layout[breakpoint];

    this.setState(
      {
        activeMosaicLayout: mosaic_layout['lg'],
        formData: {
          ...this.state.formData,
          blocks_layout: {
            ...this.state.formData.blocks_layout,
            mosaic_layout,
          },
        },
      },
      () => {
        console.debug('Set state on change layout', this.state);
      },
    );
  }

  getBlockClass(block) {
    return (
      'block-info-data block-edit-' + (block.mosaic_box_sizing || 'fit-content')
    );
  }

  createElement(el) {
    const blockid = el.i;

    // const removeStyle = {
    //   position: 'absolute',
    //   right: '2px',
    //   top: 0,
    //   cursor: 'pointer',
    // };
    const i = el.add ? '+' : el.i;
    const ref = this.state.refs[blockid];

    return (
      <div key={i} data-grid={el}>
        {this.state.preview ? (
          <BlockViewWrapper
            useref={ref}
            formData={this.state.formData}
            blockid={blockid}
            showUpdate={this.onShowBlock}
          />
        ) : (
          this.renderEditBlockPlaceholder(el, blockid)
        )}
      </div>
    );
  }

  renderEditBlockPlaceholder(el, blockid) {
    const formData = this.state.formData;
    const blocksFieldname = getBlocksFieldname(formData);

    let block = formData[blocksFieldname][blockid];
    const hasData = block['@type'] !== 'text';
    const i = el.add ? '+' : el.i; // what is this?

    let title = '';

    if (!blocks.blocksConfig[block['@type']]) {
      console.warn(
        'could not find configuration for this block type',
        block['@type'],
      );
      title = 'broken block';
    } else {
      title =
        block.mosaic_block_title || blocks.blocksConfig[block['@type']].title;
    }

    return (
      <div
        className={hasData ? 'block-edit-wrapper empty' : 'block-edit-wrapper'}
      >
        <div className={this.getBlockClass(block)}>
          {el.h > 2 && (
            <div className="block-size-info">
              {el.w} cols x {el.h} rows
            </div>
          )}
          <div>
            {el.h > 2 && (
              <div>
                <h4>{title}</h4>
              </div>
            )}
            <Button.Group size="mini">
              <Button
                size="mini"
                icon
                color="green"
                onClick={() => this.handleOpen(blockid)}
              >
                <Icon name={editIcon} size="10" />
              </Button>
              {this.state.activeScreenSize === 'lg' && (
                <Button
                  size="mini"
                  icon
                  color="red"
                  onClick={() => this.onRemoveItem.bind(this, i)()}
                >
                  <Icon name={deleteIcon} size="10" />
                </Button>
              )}
            </Button.Group>
          </div>
        </div>
      </div>
    );
  }

  onRemoveItem(id) {
    const formData = this.state.formData;
    const blocksFieldname = getBlocksFieldname(formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

    const layoutField = formData[blocksLayoutFieldname];
    const mosaic_layout = layoutField.mosaic_layout || {};

    const activeMosaicLayout = _.reject(this.state.activeMosaicLayout, {
      i: id,
    });

    // mosaic_layout[this.state.activeScreenSize] = activeMosaicLayout;
    Object.keys(mosaic_layout).forEach(k => {
      mosaic_layout[k] = _.reject(mosaic_layout[k], { i: id });
    });

    this.setState(
      {
        activeMosaicLayout,
        formData: {
          ...this.state.formData,
          [blocksLayoutFieldname]: {
            items: without(layoutField.items, id),
            mosaic_layout, // TODO: might need JSON.stringify?
          },
          [blocksFieldname]: omit(this.state.formData[blocksFieldname], [id]),
        },
      },
      () => {
        console.debug('state on removeitem', this.state);
      },
    );
  }

  onChangeField(id, value) {
    // Handles changes in the normal Volto metadata editor
    this.setState(
      {
        formData: {
          ...this.state.formData,
          [id]: value || null,
        },
      },
      () => {
        console.debug('change state in onChangeField', this.state);
      },
    );
  }

  onMutateBlock(id, value) {
    // TODO: what does this do? Explain

    const formData = this.state.formData;
    const blocksFieldname = getBlocksFieldname(formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

    const layoutField = formData[blocksLayoutFieldname];
    const mosaic_layout = layoutField.mosaic_layout || {};
    const activeMosaicLayout = this.state.activeMosaicLayout;
    mosaic_layout[this.state.activeScreenSize] = activeMosaicLayout;

    this.setState(
      {
        formData: {
          ...this.state.formData,
          [blocksFieldname]: {
            ...this.state.formData[blocksFieldname],
            [id]: value || null,
          },
          [blocksLayoutFieldname]: {
            items: this.state.formData[blocksLayoutFieldname].items,
            mosaic_layout,
          },
        },
      },
      () => {
        console.debug('change state in onMutateBlock', this.state);
      },
    );
  }

  onAddBlock(type, index) {
    // Handles the creation of a new block in the layout editor
    const id = uuid();

    const formData = this.state.formData;
    const blocksFieldname = getBlocksFieldname(formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
    const layoutField = formData[blocksLayoutFieldname];

    const newBlock = {
      i: id,
      x: 0,
      y: Infinity, // puts it at the bottom
      w: this.state.cols || 2,
      h: 2,
    };

    const newLayout = {};
    _.forEach(layoutField.mosaic_layout, (v, k) => {
      newLayout[k] = v.concat(newBlock);
    });

    this.setState(
      {
        // Add a new item. It must have a unique key!
        activeMosaicLayout: newLayout[this.state.activeScreenSize],

        refs: {
          ...this.state.refs,
          [id]: React.createRef(),
        },
        // Increment the counter to ensure key is always unique.
        formData: {
          ...this.state.formData,
          [blocksLayoutFieldname]: {
            items: [
              ...(this.state.formData[blocksLayoutFieldname].items || []),
              id,
            ],
            mosaic_layout: newLayout,
          },
          [blocksFieldname]: {
            ...this.state.formData[blocksFieldname],
            [id]: {
              '@type': type,
            },
          },
        },
      },
      () => {
        console.debug('After onAdd', this.state);
      },
    );
    return id;
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    const errors = {};
    map(this.props.schema.fieldsets, fieldset =>
      map(fieldset.fields, fieldId => {
        const field = this.props.schema.properties[fieldId];
        const data = this.state.formData[fieldId];
        if (this.props.schema.required.indexOf(fieldId) !== -1) {
          if (field.type !== 'boolean' && !data) {
            errors[fieldId] = errors[field] || [];
            errors[fieldId].push(
              this.props.intl.formatMessage(messages.required),
            );
          }
          if (field.minLength && data.length < field.minLength) {
            errors[fieldId] = errors[field] || [];
            errors[fieldId].push(
              this.props.intl.formatMessage(messages.minLength, {
                len: field.minLength,
              }),
            );
          }
        }
        if (field.uniqueItems && data && uniq(data).length !== data.length) {
          errors[fieldId] = errors[field] || [];
          errors[fieldId].push(
            this.props.intl.formatMessage(messages.uniqueItems),
          );
        }
      }),
    );
    if (keys(errors).length > 0) {
      this.setState(
        {
          errors,
        },
        () =>
          toast.error(
            <Toast
              error
              title="Validation error"
              content="There were some errors in form validation. Please check metadata"
            />,
          ),
      );
    } else {
      this.props.onSubmit(this.state.formData);
      if (this.props.resetAfterSubmit) {
        this.setState(
          {
            formData: this.props.formData,
          },
          () => this.props.onUpdateForm && this.props.onUpdateForm(errors),
        );
      }
    }
  }

  handleLayoutToolbar(evType, data) {
    // console.log('handleLayoutToolbar', evType, data);

    switch (evType) {
      case 'PREVIEW_TILES':
        this.setState({
          preview: data,
        });
        break;
      case 'CHANGE_ZOOM':
        this.setState({
          zoom: data,
        });
        break;
      case 'CHANGE_SCREEN_SIZE':
        const formData = this.state.formData;
        const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
        const layoutField = formData[blocksLayoutFieldname];
        const layouts = layoutField.mosaic_layout || {};

        let fallback = layouts['lg']
          ? JSON.parse(JSON.stringify(layouts['lg']))
          : [];

        const activeMosaicLayout = layouts[data] || fallback;
        let layoutWidth = breakpoints[data];
        if (data === 'lg') {
          layoutWidth = null;
        } else if (data === 'xxs') {
          layoutWidth = breakpoints['xs'] - 20;
        }
        console.debug('Change screen', data, layoutWidth, layouts);
        // TODO: this needs to be improved. We want to automatically take
        // size from (<next upper breakpoint> -1)

        this.setState(
          {
            activeMosaicLayout,
            dirtyLayout: false, // This could be used to show that layout
            // will be saved
            activeScreenSize: data,
            layoutWidth,
          },
          // this.changeLayoutOnScreenSizeChange(data),
        );
        break;
      case 'CHANGE_MARGINS':
        console.log('change margins', data);
        this.setState(
          {
            formData: {
              ...this.state.formData,
              blocks_layout: {
                ...this.state.formData.blocks_layout,
                margins: data,
              },
            },
          },
          () => {
            console.log('SET STATE ON MARGINS CHANGE', this.state);
          },
        );
        break;
      case 'CREATE_TILE':
        this.onAddBlock('text');
        break;
      case 'CREATE_LAYOUT':
        // console.log('herere', this.state);
        this.onLayoutSave(data);
        break;
      case 'DELETE_LAYOUT':
        this.onLayoutDelete(data);
        break;
      default:
        break;
    }
  }

  onResizeStop(layout, old, neu, x, e, node) {
    // console.log('on resize stop'); //, layout, oldDragItem, l, x, e, node);

    let dW = neu.w - old.w; // negative if size made smaller
    layout.forEach((el, i) => {
      if (el.i === neu.i) return;

      if (el.x === old.x + old.w) {
        // dragged from right side, to left
        console.debug('resizeToLeft w x', dW, el.w, el.x);
        el.x = neu.x + neu.w;
        el.w -= neu.w - old.w;
      }
      // else if (el.x - dW === neu.x + neu.w) {
      //   // resized original to left
      //   console.log('resizeToRight w x', dW, el.w, el.x);
      //   el.x -= dW;
      //   el.w += dW;
      // }
    });

    // if the height has changed, set sizing policy for this layout to manual
    const blockid = old.i;
    const formData = this.state.formData;
    const blocksFieldname = getBlocksFieldname(formData);

    this.setState(
      (state, props) => {
        const blockData = state.formData[blocksFieldname][blockid] || {};
        let mosaic_box_sizing = blockData.mosaic_box_sizing || 'fit-content';
        if (neu.h !== old.h) mosaic_box_sizing = 'manual';
        return {
          dirtyLayout: true,
          formData: {
            ...state.formData,
            [blocksFieldname]: {
              ...state.formData[blocksFieldname],
              [blockid]: {
                ...state.formData[blocksFieldname][blockid],
                mosaic_box_sizing,
              },
            },
          },
        };
      },
      () => {
        // console.log('after resize', this.state);
      },
    );
  }

  onDragStop(layout, old, neu, x, e, node) {
    // console.log('on drag stop'); // , layout, oldDragItem, l, x, e, node);
    this.setState({
      dirtyLayout: true,
    });
  }

  render() {
    const { schema } = this.props; // , onCancel, onSubmit
    // console.log('render props', this.props);
    // console.log('mosaic props', this.props.inputRef);
    // console.log('mosaic layout', this.state?.formData);
    const marginsData =
      this.state.formData?.blocks_layout?.margins &&
      parseInt(this.state.formData?.blocks_layout?.margins);
    const margins = marginsData ? [marginsData, marginsData] : [0, 0];

    return __CLIENT__ ? (
      <div className="ui wrapper" style={{ overflow: 'auto' }}>
        <div
          className={`ui layout-preview ${zoomClassNames[this.state.zoom]}`}
          id={'layout-preview-' + this.state.activeScreenSize}
        >
          <SizeMe>
            {({ size }) => (
              <ReactGridLayout
                onLayoutChange={this.onLayoutChange}
                onBreakpointChange={this.onBreakpointChange}
                layout={this.state.activeMosaicLayout}
                width={
                  this.state.layoutWidth ||
                  size.width ||
                  document.querySelector('main').offsetWidth
                }
                transformScale={zoomCoeficients[this.state.zoom]}
                // onDragStop={this.onDragStop}
                // onResizeStop={this.onResizeStop}
                // onResize={this.onResize}
                // onResizeStart={this.onResizeStart}
                {...this.props}
                margin={[0, 0]}
              >
                {_.map(this.state.activeMosaicLayout, el =>
                  this.createElement(el),
                )}
              </ReactGridLayout>
            )}
          </SizeMe>
        </div>

        {/* onChangeBlock={this.onEditBlock} */}
        {this.state.showModal ? (
          <BlockEditor
            blockid={this.state.currentBlock}
            formData={this.state.formData}
            onClose={this.handleCloseEditor}
          />
        ) : (
          ''
        )}
        <SidebarPortal selected={!this.state.showModal}>
          <TemplatingToolbar
            mode={this.props.mode}
            formData={this.state.formData || {}}
            onSave={({ blocks, blocks_layout }) =>
              this.setState({
                formData: { ...this.state.formData, blocks, blocks_layout },
              })
            }
          />

          <LayoutToolbar
            availableScreens={this.state.availableScreens}
            layouts={
              this.state.formData.blocks_layout.mosaic_layout ||
              this.props.formData.blocks_layout.mosaic_layout
            }
            preview={this.state.preview}
            activeMosaicLayout={this.state.activeMosaicLayout}
            dispatchToParent={this.handleLayoutToolbar}
            currentZoom={this.state.zoom}
            margins={this.state.formData?.blocks_layout.margins}
            tilesList={_.map(this.state.activeMosaicLayout, el => (
              <List.Item key={el.i}>
                <List.Content floated="right">
                  <Button size="mini" onClick={() => this.handleOpen(el.i)}>
                    Edit
                  </Button>
                </List.Content>
                <List.Content verticalAlign="middle">
                  <Grid stretched>
                    <Grid.Column width="8">
                      {getBlockById(this.state.formData, el.i)?.[
                        '@type'
                      ].replace(/_/gi, ' ')}
                    </Grid.Column>
                    <Grid.Column width="4">
                      <small>
                        {el.w} x {el.h}
                      </small>
                    </Grid.Column>
                  </Grid>
                </List.Content>
              </List.Item>
            ))}
          />
        </SidebarPortal>
        <Portal
          node={__CLIENT__ && document.getElementById('sidebar-metadata')}
        >
          <UiForm
            method="post"
            onSubmit={this.onSubmit}
            error={keys(this.state.errors).length > 0}
          >
            {schema &&
              map(schema.fieldsets, item => [
                <Segment secondary attached key={item.title}>
                  {item.title}
                </Segment>,
                <Segment attached key={`fieldset-contents-${item.title}`}>
                  {map(item.fields, (field, index) => (
                    <Field
                      {...schema.properties[field]}
                      id={field}
                      focus={false}
                      value={this.state.formData[field]}
                      required={schema.required.indexOf(field) !== -1}
                      onChange={this.onChangeField}
                      key={field}
                      error={this.state.errors[field]}
                    />
                  ))}
                </Segment>,
              ])}
          </UiForm>
        </Portal>
      </div>
    ) : (
      ''
    );
  }

  // onResize(layout, old, neu, x, e, node) {
  // console.log(
  //   'on resize layout, oldDragItem, l, x, e, node',
  //   layout,
  //   oO, // oldDragItem, the element that was dragged
  //   nO, // new dragged item, the element that became new
  //   x,
  //   e,
  //   node,
  // );
  // let startH = neu.y;
  // let endH = neu.y + neu.h;
  // console.log('resize', layout, old, neu);
  // TODO: find all elements that are on the same "row"
  // change width of elements only if they are dW units "left behind"
  // console.log('on resize');
  // }

  // onResizeStart(layout, oldDragItem, l, x, e, node) {
  //   console.log('on resize start'); //, layout, oldDragItem, l, x, e, node);
  //   // TODO: identify affected blocks, keep them in state, update their size
  // }

  // onDrag(layout, oldDragItem, l, x, e, node) {
  //   // console.log(
  //   //   'on drag layout, oldDragItem, l, x, e, node',
  //   //   layout,
  //   //   oldDragItem,
  //   //   l,
  //   //   x,
  //   //   // e,
  //   //   // node,
  //   // );
  // }

  // onDragStart(layout, oldDragItem, l, x, e, node) {
  //   // console.log('on drag start'); //, layout, oldDragItem, l, x, e, node);
  // }

  // onEditBlock(id, value, size) {
  //   // Handles editing of block by the block editor
  //   const blocksFieldname = getBlocksFieldname(this.state.formData);
  //   this.setState({
  //     formData: {
  //       ...this.state.formData,
  //       [blocksFieldname]: {
  //         ...this.state.formData[blocksFieldname],
  //         [id]: value || null,
  //       },
  //     },
  //   });
  // }
}

export default connect(
  null,
  { changeSidebarState },
)(injectIntl(Form, { forwardRef: true }));
