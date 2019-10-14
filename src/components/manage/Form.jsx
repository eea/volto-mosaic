// import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keys, map, mapValues, omit, uniq, without } from 'lodash';
import { Button, Form as UiForm, Segment } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { Portal } from 'react-portal';

import { Field, Icon } from '@plone/volto/components'; // EditTile
import {
  getTilesFieldname,
  getTilesLayoutFieldname,
} from '@plone/volto/helpers';

import _ from 'lodash';

import RGL from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { SizeMe } from 'react-sizeme';

import '../css/edit.css';
import '../css/view.css';

import { rowHeight, breakpoints, screenSizes } from '../../config';

import TileEditor from './TileEditor';
import LayoutToolbar from './LayoutToolbar';
import { TileViewWrapper } from './../theme/View';

import deleteIcon from '@plone/volto/icons/delete.svg';
import editIcon from '@plone/volto/icons/editing.svg';

import { tiles } from '~/config';
// import move from 'lodash-move';
// import aheadSVG from '@plone/volto/icons/ahead.svg';
// import clearSVG from '@plone/volto/icons/clear.svg';
const ReactGridLayout = RGL;

const screens = Object.keys(screenSizes).map(k => {
  return { key: k, text: screenSizes[k], value: k };
});

const messages = defineMessages({
  addTile: {
    id: 'Add tile...',
    defaultMessage: 'Add tile...',
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

function fallbackLayoutFromData(formData, ids) {
  // create a default layout based on existing tiles

  const tilesFieldname = getTilesFieldname(formData);
  const tilesLayoutFieldname = getTilesLayoutFieldname(formData);

  const order = formData[tilesLayoutFieldname].items || [];
  const data = formData[tilesFieldname];

  const fallbackLayout = [
    {
      // provide default tile for title
      h: 1,
      i: ids.title,
      w: 12,
      x: 0,
      y: 0,
    },
    {
      // provide default tile for text
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
    tiles: PropTypes.arrayOf(PropTypes.object),
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
    tiles: [],
    title: null,
    visual: false,

    preview: false,
    // Grid props
    className: 'mosaic-edit-layout',
    // cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    // cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
    cols: 12,
    rowHeight: rowHeight,
    margin: [0, 0],
    layoutWidth: null, // preview responsive layout width
    activeScreenSize: 'lg', // 'desktop' is the default screen size

    payload: null, // tiledata that will be saved
  };

  constructor(props) {
    super(props);

    if (__SERVER__) return;

    const ids = {
      title: uuid(),
      text: uuid(),
    };
    let { formData } = props;
    const tilesFieldname = getTilesFieldname(formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(formData);

    if (formData === null) {
      // get defaults from schema
      formData = mapValues(props.schema.properties, 'default');
    }
    // defaults for block editor; should be moved to schema on server side
    if (!formData[tilesLayoutFieldname]) {
      formData[tilesLayoutFieldname] = {
        items: [ids.title, ids.text],
      };
    }
    if (!formData[tilesFieldname]) {
      formData[tilesFieldname] = {
        [ids.title]: {
          '@type': 'title',
          mosaic_tile_title: 'title tile',
        },
        [ids.text]: {
          '@type': 'text',
          mosaic_tile_title: 'text tile',
        },
      };
    }

    const activeScreenSize = this.props.activeScreenSize;
    // TODO: rewrite with ? operator
    const activeMosaicLayout =
      (this.props.formData &&
        this.props.formData.tiles_layout &&
        this.props.formData.tiles_layout.mosaic_layout &&
        this.props.formData.tiles_layout.mosaic_layout[activeScreenSize]) ||
      fallbackLayoutFromData(formData, ids);

    if (!formData[tilesLayoutFieldname].mosaic_layout) {
      formData[tilesLayoutFieldname].mosaic_layout = {
        lg: activeMosaicLayout,
      };
    }

    const items = formData[tilesLayoutFieldname].items || [];
    const refs = items.map(id => [id, React.createRef()]);

    this.state = {
      formData,
      errors: {},
      cols: 12,
      availableScreens: screens,
      layoutWidth: this.props.layoutWidth,
      activeScreenSize,
      activeMosaicLayout,
      dirtyLayout: false,
      refs: fromEntries(refs),
      tileHeights: {},
    };

    // this.onMoveTile = this.onMoveTile.bind(this);
    // this.onSelectTile = this.onSelectTile.bind(this);
    // this.onDeleteTile = this.onDeleteTile.bind(this);
    // this.onFocusPreviousTile = this.onFocusPreviousTile.bind(this);
    // this.onFocusNextTile = this.onFocusNextTile.bind(this);
    // this.handleKeyDown = this.handleKeyDown.bind(this);
    // this.onEditTile = this.onEditTile.bind(this);
    // this.renderTilePreview = this.renderTilePreview.bind(this);
    // this.onDragStart = this.onDragStart.bind(this);
    // this.onDrag = this.onDrag.bind(this);
    // this.onResize = this.onResize.bind(this);
    // this.onResizeStart = this.onResizeStart.bind(this);

    this.onDragStop = this.onDragStop.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);

    this.onChangeField = this.onChangeField.bind(this);
    this.onMutateTile = this.onMutateTile.bind(this);
    this.onAddTile = this.onAddTile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.createElement = this.createElement.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleCloseEditor = this.handleCloseEditor.bind(this);
    this.handleLayoutToolbar = this.handleLayoutToolbar.bind(this);
    this.onShowTile = this.onShowTile.bind(this);
  }

  handleOpen(tileid) {
    this.setState({ showModal: true, currentTile: tileid, tileHeights: {} });
  }

  handleCloseEditor(tileData) {
    if (!tileData) {
      this.setState({
        showModal: false,
        currentTile: null,
      });
      return;
    }

    const tileid = this.state.currentTile;

    const formData = this.state.formData;
    const tilesFieldname = getTilesFieldname(formData);

    this.setState(
      {
        formData: {
          ...this.state.formData,
          [tilesFieldname]: {
            ...this.state.formData[tilesFieldname],
            [tileid]: tileData || null,
          },
        },
        showModal: false,
        preview: true,
      },
      () => {
        console.log('state after handleCloseEditor', this.state);
      },
    );
  }

  onShowTile(tileid, height) {
    const formData = this.state.formData;

    const tilesFieldname = getTilesFieldname(formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(formData);
    const layoutField = formData[tilesLayoutFieldname];
    const activeScreenSize = this.state.activeScreenSize || 'lg';
    const tileData = formData[tilesFieldname][tileid];

    const sizing = tileData.mosaic_box_sizing || 'fit-content';

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
                return el.i === tileid;
              }),
            );
            activeMosaicLayout[ix].h = lh;
            return {
              formData: {
                ...state.formData,
                [tilesLayoutFieldname]: {
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
            console.log('height of node', height, lh, tileid, this.state);
          },
        );
        break;

      // case 'min-height':
      //   // TODO: get minimum tile height from settings, trigger layout update
      //   const type = formData['@type'].toLowerCase();
      //   const minHeight = tiles.tilesConfig[type].height || 100;
      //   height = Math.ceil(minHeight / this.props.rowHeight);
      //   ix = activeMosaicLayout.indexOf(
      //     activeMosaicLayout.find(el => {
      //       return el.i === tileid;
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
    console.log('on layout change');
    const formData = this.state.formData;
    const tilesLayoutFieldname = getTilesLayoutFieldname(formData);
    const layoutField = formData[tilesLayoutFieldname];
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
            [tilesLayoutFieldname]: {
              ...state.formData[tilesLayoutFieldname],
              mosaic_layout: {
                ...state.formData[tilesLayoutFieldname].mosaic_layout,
                [size]: newLayout,
              },
            },
          },
        };
      },
      () => {
        console.log('Set state on change layout ' + size, this.state);
      },
    );
  }

  onLayoutSave(breakpoint) {
    const formData = this.state.formData;
    const tilesLayoutFieldname = getTilesLayoutFieldname(formData);
    const layoutField = formData[tilesLayoutFieldname];
    const mosaic_layout = layoutField.mosaic_layout || {};

    mosaic_layout[
      breakpoint ? breakpoint : 'lg'
    ] = this.state.activeMosaicLayout;

    this.setState(
      {
        // activeMosaicLayout: mosaic_layout,
        formData: {
          ...this.state.formData,
          tiles_layout: {
            ...this.state.formData.tiles_layout,
            mosaic_layout,
          },
        },
      },
      () => {
        console.log('Set state on layout save', this.state);
      },
    );
  }

  onLayoutDelete(breakpoint) {
    const formData = this.state.formData;
    const tilesLayoutFieldname = getTilesLayoutFieldname(formData);
    const layoutField = formData[tilesLayoutFieldname];
    const mosaic_layout = layoutField.mosaic_layout || {};

    delete mosaic_layout[breakpoint];

    this.setState(
      {
        activeMosaicLayout: mosaic_layout['lg'],
        formData: {
          ...this.state.formData,
          tiles_layout: {
            ...this.state.formData.tiles_layout,
            mosaic_layout,
          },
        },
      },
      () => {
        console.log('Set state on change layout', this.state);
      },
    );
  }

  getTileClass(tile) {
    return (
      'tile-info-data tile-edit-' + (tile.mosaic_box_sizing || 'fit-content')
    );
  }

  createElement(el) {
    const tileid = el.i;

    // const removeStyle = {
    //   position: 'absolute',
    //   right: '2px',
    //   top: 0,
    //   cursor: 'pointer',
    // };
    const i = el.add ? '+' : el.i;
    const ref = this.state.refs[tileid];

    return (
      <div key={i} data-grid={el}>
        {this.state.preview ? (
          <TileViewWrapper
            useref={ref}
            formData={this.state.formData}
            tileid={tileid}
            showUpdate={this.onShowTile}
          />
        ) : (
          this.renderEditTilePlaceholder(el, tileid)
        )}
      </div>
    );
  }

  renderEditTilePlaceholder(el, tileid) {
    const formData = this.state.formData;
    const tilesFieldname = getTilesFieldname(formData);

    let tile = formData[tilesFieldname][tileid];
    const hasData = tile['@type'] !== 'text';
    const i = el.add ? '+' : el.i; // what is this?

    let title = '';

    if (!tiles.tilesConfig[tile['@type']]) {
      console.log(
        'could not find configuration for this tile type',
        tile['@type'],
      );
      title = 'broken tile';
    } else {
      title = tile.mosaic_tile_title || tiles.tilesConfig[tile['@type']].title;
    }

    return (
      <div
        className={hasData ? 'tile-edit-wrapper empty' : 'tile-edit-wrapper'}
      >
        <div className={this.getTileClass(tile)}>
          {el.h > 2 && (
            <div className="tile-size-info">
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
                onClick={() => this.handleOpen(tileid)}
              >
                <Icon name={editIcon} size="10" />
              </Button>
              {this.state.activeScreenSize === 'lg' && (
                <Button
                  size="mini"
                  icon
                  color="red"
                  onClick={this.onRemoveItem.bind(this, i)}
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
    const tilesFieldname = getTilesFieldname(formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(formData);

    const layoutField = formData[tilesLayoutFieldname];
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
          [tilesLayoutFieldname]: {
            items: without(layoutField.items, id),
            mosaic_layout, // TODO: might need JSON.stringify?
          },
          [tilesFieldname]: omit(this.state.formData[tilesFieldname], [id]),
        },
      },
      () => {
        console.log('state on removeitem', this.state);
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
        console.log('change state in onChangeField', this.state);
      },
    );
  }

  onMutateTile(id, value) {
    // TODO: what does this do? Explain

    const formData = this.state.formData;
    const tilesFieldname = getTilesFieldname(formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(formData);

    const layoutField = formData[tilesLayoutFieldname];
    const mosaic_layout = layoutField.mosaic_layout || {};
    const activeMosaicLayout = this.state.activeMosaicLayout;
    mosaic_layout[this.state.activeScreenSize] = activeMosaicLayout;

    this.setState(
      {
        formData: {
          ...this.state.formData,
          [tilesFieldname]: {
            ...this.state.formData[tilesFieldname],
            [id]: value || null,
          },
          [tilesLayoutFieldname]: {
            items: this.state.formData[tilesLayoutFieldname].items,
            mosaic_layout,
          },
        },
      },
      () => {
        console.log('change state in onMutateTile', this.state);
      },
    );
  }

  onAddTile(type, index) {
    // Handles the creation of a new tile in the layout editor
    const id = uuid();

    const formData = this.state.formData;
    const tilesFieldname = getTilesFieldname(formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(formData);
    const layoutField = formData[tilesLayoutFieldname];

    // const totalItems = formData[tilesLayoutFieldname].items.length;
    // const insert = index === -1 ? totalItems : index;

    const newTile = {
      i: id,
      x: 0,
      y: Infinity, // puts it at the bottom
      w: this.state.cols || 2,
      h: 2,
    };
    const newLayout = this.state.activeMosaicLayout.concat(newTile);

    let mosaic_layout = layoutField.mosaic_layout || {};

    /// avoids ugly BBB situation
    if (typeof mosaic_layout === typeof []) mosaic_layout = {};
    mosaic_layout[this.state.activeScreenSize] = newLayout;

    this.setState(
      {
        // Add a new item. It must have a unique key!
        activeMosaicLayout: newLayout,

        refs: {
          ...this.state.refs,
          [id]: React.createRef(),
        },
        // Increment the counter to ensure key is always unique.
        formData: {
          ...this.state.formData,
          [tilesLayoutFieldname]: {
            items: [
              ...(this.state.formData[tilesLayoutFieldname].items || []),
              id,
            ],
            mosaic_layout: { ...mosaic_layout },
          },
          [tilesFieldname]: {
            ...this.state.formData[tilesFieldname],
            [id]: {
              '@type': type,
            },
          },
        },
      },
      () => {
        console.log('After onAdd', this.state);
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
      this.setState({
        errors,
      });
    } else {
      this.props.onSubmit(this.state.formData);
      if (this.props.resetAfterSubmit) {
        this.setState({
          formData: this.props.formData,
        });
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
      case 'CHANGE_SCREEN_SIZE':
        const formData = this.state.formData;
        const tilesLayoutFieldname = getTilesLayoutFieldname(formData);
        const layoutField = formData[tilesLayoutFieldname];
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
        console.log('Change screen', data, layoutWidth, layouts);
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
      case 'CREATE_TILE':
        this.onAddTile('text');
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

  render() {
    const { schema } = this.props; // , onCancel, onSubmit
    console.log('render props', this.props);

    return __CLIENT__ ? (
      <div className="ui wrapper">
        <LayoutToolbar
          availableScreens={this.state.availableScreens}
          layouts={
            this.state.formData.tiles_layout.mosaic_layout ||
            this.props.formData.tiles_layout.mosaic_layout
          }
          preview={this.state.preview}
          activeMosaicLayout={this.state.activeMosaicLayout}
          dispatchToParent={this.handleLayoutToolbar}
        />

        <div
          className="layout-preview"
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
                onDragStop={this.onDragStop}
                onResizeStop={this.onResizeStop}
                onResize={this.onResize}
                onResizeStart={this.onResizeStart}
                {...this.props}
              >
                {_.map(this.state.activeMosaicLayout, el =>
                  this.createElement(el),
                )}
              </ReactGridLayout>
            )}
          </SizeMe>
        </div>

        {/* onChangeTile={this.onEditTile} */}
        {this.state.showModal ? (
          <TileEditor
            tileid={this.state.currentTile}
            formData={this.state.formData}
            onClose={this.handleCloseEditor}
          />
        ) : (
          ''
        )}

        <Portal
          node={__CLIENT__ && document.getElementById('sidebar-properties')}
        >
          <UiForm>
            <Segment secondary attached>
              Layout properties
            </Segment>
            <Segment attached>
              <Field
                id="layout-css"
                title="CSS Overrides"
                value={
                  this.state.formData.tiles_layout?.mosaic_layout
                    ?.mosaic_css_override || ''
                }
                description="Custom css for this layout page"
                widget="textarea"
                required={false}
                onChange={(id, value) => {
                  this.setState({
                    formData: {
                      ...this.state.formData,
                      tiles_layout: {
                        ...this.state.formData.tiles_layout,
                        mosaic_layout: {
                          ...(this.state.formData.tiles_layout?.mosaic_layout ||
                            {}),
                          mosaic_css_override: value,
                        },
                      },
                    },
                  });
                }}
              />
            </Segment>
          </UiForm>
        </Portal>

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
                      focus={index === 0}
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

  onResizeStop(layout, old, neu, x, e, node) {
    // console.log('on resize stop'); //, layout, oldDragItem, l, x, e, node);

    let dW = neu.w - old.w; // negative if size made smaller
    layout.forEach((el, i) => {
      if (el.i === neu.i) return;

      if (el.x === old.x + old.w) {
        // dragged from right side, to left
        console.log('resizeToLeft w x', dW, el.w, el.x);
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
    const tileid = old.i;
    const formData = this.state.formData;
    const tilesFieldname = getTilesFieldname(formData);

    this.setState(
      (state, props) => {
        const tileData = state.formData[tilesFieldname][tileid] || {};
        let mosaic_box_sizing = tileData.mosaic_box_sizing || 'fit-content';
        if (neu.h !== old.h) mosaic_box_sizing = 'manual';
        return {
          dirtyLayout: true,
          formData: {
            ...state.formData,
            [tilesFieldname]: {
              ...state.formData[tilesFieldname],
              [tileid]: {
                ...state.formData[tilesFieldname][tileid],
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
  //   // TODO: identify affected tiles, keep them in state, update their size
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

  // onEditTile(id, value, size) {
  //   // Handles editing of tile by the tile editor
  //   const tilesFieldname = getTilesFieldname(this.state.formData);
  //   this.setState({
  //     formData: {
  //       ...this.state.formData,
  //       [tilesFieldname]: {
  //         ...this.state.formData[tilesFieldname],
  //         [id]: value || null,
  //       },
  //     },
  //   });
  // }
}

export default injectIntl(Form, { forwardRef: true });
