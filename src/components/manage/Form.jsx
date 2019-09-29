import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keys, map, mapValues, omit, uniq, without } from 'lodash';
import {
  Button,
  // Container,
  Form as UiForm,
  Segment,
  // Tab,
  // Message,
  // Modal,
  // Select,
  Radio,
} from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { Portal } from 'react-portal';

import { Field } from '@plone/volto/components'; // EditTile, Icon,
import {
  getTilesFieldname,
  getTilesLayoutFieldname,
} from '@plone/volto/helpers';

import _ from 'lodash';

import { Responsive } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { SizeMe } from 'react-sizeme';
import { tiles } from '~/config';

import '../css/edit.css';
import '../css/view.css';

import { rowHeight } from '../../config';
import { breakpoints } from '../../config';

import TileEditor from './TileEditor';
import LayoutToolbar from './LayoutToolbar';
import { screenSizes } from '../../config';

// import move from 'lodash-move';
// import aheadSVG from '@plone/volto/icons/ahead.svg';
// import clearSVG from '@plone/volto/icons/clear.svg';

const ReactGridLayout = Responsive;

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
    }).isRequired,
    formData: PropTypes.objectOf(PropTypes.any),
    pathname: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    submitLabel: PropTypes.string,
    resetAfterSubmit: PropTypes.bool,
    intl: intlShape.isRequired,
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
    formData: null,
    onSubmit: null,
    onCancel: null,
    submitLabel: null,
    resetAfterSubmit: false,
    title: null,
    description: null,
    error: null,
    loading: null,
    hideActions: false,
    visual: false,
    tiles: [],
    pathname: '',

    // Grid props
    className: 'mosaic-edit-layout',
    // cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
    rowHeight: rowHeight,
    margin: [0, 0],
    layoutWidth: null, // preview responsive layout width
    activeScreenSize: 'lg', // 'desktop' is the default screen size
  };

  constructor(props) {
    super(props);

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
        },
        [ids.text]: {
          '@type': 'text',
        },
      };
    }

    let layout =
      (this.props.formData &&
        this.props.formData.tiles_layout &&
        this.props.formData.tiles_layout.mosaic_layout) ||
      [];

    this.state = {
      formData,
      errors: {},
      modals: {},
      mosaic_layout: layout,
      cols: 12,
      availableScreens: screens,
    };

    // this.onMoveTile = this.onMoveTile.bind(this);
    // this.onSelectTile = this.onSelectTile.bind(this);
    // this.onDeleteTile = this.onDeleteTile.bind(this);
    // this.onFocusPreviousTile = this.onFocusPreviousTile.bind(this);
    // this.onFocusNextTile = this.onFocusNextTile.bind(this);
    // this.handleKeyDown = this.handleKeyDown.bind(this);

    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeTile = this.onChangeTile.bind(this);
    this.onMutateTile = this.onMutateTile.bind(this);
    this.onAddTile = this.onAddTile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.renderTile = this.renderTile.bind(this);
    this.createElement = this.createElement.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleCloseEditor = this.handleCloseEditor.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.handleLayoutToolbar = this.handleLayoutToolbar.bind(this);
  }

  handleOpen(tileid) {
    this.setState({ showModal: true, currentTile: tileid });
  }

  handleCloseEditor(tileData, size) {
    let tileid = this.state.currentTile;

    if (tileData) {
      const height = Math.ceil(size.height / this.props.rowHeight);
      const formData = this.state.formData;
      const tilesLayoutFieldname = getTilesLayoutFieldname(formData);
      const layout = formData[tilesLayoutFieldname];
      let mosaic_layout = layout.mosaic_layout;

      let ix = mosaic_layout.indexOf(
        mosaic_layout.find(el => {
          return el.i === tileid;
        }),
      );
      mosaic_layout[ix].h = height;

      this.setState({
        formData: {
          ...this.state.formData,
          tiles: {
            ...this.state.formData.tiles,
            [tileid]: tileData,
          },
          [tilesLayoutFieldname]: {
            ...layout,
            mosaic_layout,
          },
        },
        showModal: false,
        currentTile: null,
        mosaic_layout,
      });
    } else {
      this.setState({
        showModal: false,
        currentTile: null,
      });
    }
  }

  onLayoutChange(layout) {
    this.setState(
      {
        mosaic_layout: layout,
        formData: {
          ...this.state.formData,
          tiles_layout: {
            ...this.state.formData.tiles_layout,
            mosaic_layout: layout,
          },
        },
      },
      () => {
        console.log('Set state on change layout', this.state);
      },
    );
  }

  renderTile(tileid) {
    const content = this.state.formData;
    const tilesFieldname = getTilesFieldname(content);
    const availableTiles = content[tilesFieldname];
    const tiletype = availableTiles[tileid]['@type'].toLowerCase();

    let Tile = null;
    Tile = tiles.tilesConfig[tiletype].view;

    return Tile !== null ? (
      <div className="tile-container">
        <Tile key={tileid} properties={content} data={availableTiles[tileid]} />
      </div>
    ) : (
      <div> {JSON.stringify(tiletype)} </div>
    );
  }

  createElement(el) {
    const tileid = el.i;

    const removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer',
    };
    const i = el.add ? '+' : el.i;
    return (
      <div key={i} data-grid={el}>
        {this.state.preview ? (
          this.renderTile(tileid)
        ) : (
          <div>
            <Button onClick={() => this.handleOpen(tileid)}>Edit</Button>
          </div>
        )}

        <button
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </button>
      </div>
    );
  }

  onRemoveItem(id) {
    const tilesFieldname = getTilesFieldname(this.state.formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);

    this.setState({
      mosaic_layout: _.reject(this.state.mosaic_layout, { i: id }),
      formData: {
        ...this.state.formData,
        [tilesLayoutFieldname]: {
          items: without(this.state.formData[tilesLayoutFieldname].items, id),
          mosaic_layout: _.reject(this.state.mosaic_layout, { i: id }),
        },
        [tilesFieldname]: omit(this.state.formData[tilesFieldname], [id]),
      },
    });
  }

  onChangeField(id, value) {
    this.setState({
      formData: {
        ...this.state.formData,
        [id]: value || null,
      },
    });
  }

  onChangeTile(id, value, size) {
    // TODO: update this method
    const tilesFieldname = getTilesFieldname(this.state.formData);
    this.setState({
      formData: {
        ...this.state.formData,
        [tilesFieldname]: {
          ...this.state.formData[tilesFieldname],
          [id]: value || null,
        },
      },
    });
  }

  onMutateTile(id, value) {
    // const idTrailingTile = uuid();
    // const index =
    //   this.state.formData[tilesLayoutFieldname].items.indexOf(id) + 1;

    const tilesFieldname = getTilesFieldname(this.state.formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);

    this.setState({
      formData: {
        ...this.state.formData,
        [tilesFieldname]: {
          ...this.state.formData[tilesFieldname],
          [id]: value || null,
        },
        [tilesLayoutFieldname]: {
          items: this.state.formData[tilesLayoutFieldname].items,
          mosaic_layout: this.state.mosaic_layout,
        },
      },
    });
  }

  onAddTile(type, index) {
    const id = uuid();
    const tilesFieldname = getTilesFieldname(this.state.formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);
    const totalItems = this.state.formData[tilesLayoutFieldname].items.length;
    const insert = index === -1 ? totalItems : index;

    const newTile = {
      i: id,
      x: 0,
      y: Infinity, // puts it at the bottom
      w: this.state.cols || 2,
      h: 2,
    };
    const layout = this.state.mosaic_layout.concat(newTile);

    this.setState(
      {
        // Add a new item. It must have a unique key!
        mosaic_layout: layout,

        // Increment the counter to ensure key is always unique.
        formData: {
          ...this.state.formData,
          [tilesLayoutFieldname]: {
            items: [
              ...this.state.formData[tilesLayoutFieldname].items.slice(
                0,
                insert,
              ),
              id,
              ...this.state.formData[tilesLayoutFieldname].items.slice(insert),
            ],
            mosaic_layout: layout,
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

  onDragStart(ev) {
    console.log(ev);
  }

  handleLayoutToolbar(evType, data) {
    console.log('handleLayoutToolbar', evType, data);

    switch (evType) {
      case 'PREVIEW_RESPONSIVE':
        this.setState({
          layoutWidth: data ? breakpoints[this.state.activeScreenSize] : null,
        });
        break;
      case 'CHANGE_SCREEN_SIZE':
        this.setState({
          activeScreenSize: data,
          layoutWidth: this.state.layoutWidth ? breakpoints[data] : null,
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { schema } = this.props; // , onCancel, onSubmit
    // const { formData } = this.state;
    // const tilesFieldname = getTilesFieldname(formData);
    // const tilesLayoutFieldname = getTilesLayoutFieldname(formData);
    // const renderTiles = formData[tilesLayoutFieldname].items;
    // const tilesDict = formData[tilesFieldname];

    let node =
      __CLIENT__ && document.querySelector('#toolbar .toolbar-actions');

    // {map(renderTiles, (tile, index) => (
    //   <EditTile
    //     id={tile}
    //     index={index}
    //     type={tilesDict[tile]['@type']}
    //     key={tile}
    //     handleKeyDown={this.handleKeyDown}
    //     onAddTile={this.onAddTile}
    //     onChangeTile={this.onChangeTile}
    //     onMutateTile={this.onMutateTile}
    //     onChangeField={this.onChangeField}
    //     onDeleteTile={this.onDeleteTile}
    //     onSelectTile={this.onSelectTile}
    //     onMoveTile={this.onMoveTile}
    //     onFocusPreviousTile={this.onFocusPreviousTile}
    //     onFocusNextTile={this.onFocusNextTile}
    //     properties={formData}
    //     data={tilesDict[tile]}
    //     pathname={this.props.pathname}
    //     tile={tile}
    //     selected={this.state.selected === tile}
    //   />
    // ))}

    console.log('layout width in render', this.state.layoutWidth);

    return this.props.visual ? (
      <div className="ui wrapper">
        <LayoutToolbar
          availableScreens={this.state.availableScreens}
          dispatchToParent={this.handleLayoutToolbar}
        />

        <SizeMe>
          {({ size }) => (
            <ReactGridLayout
              onLayoutChange={this.onLayoutChange}
              onBreakpointChange={this.onBreakpointChange}
              width={
                this.state.layoutWidth ||
                size.width ||
                document.querySelector('main').offsetWidth
              }
              onDragStart={this.onDragStart}
              {...this.props}
            >
              {_.map(this.state.mosaic_layout, el => this.createElement(el))}
            </ReactGridLayout>
          )}
        </SizeMe>

        {this.state.showModal ? (
          <TileEditor
            tileid={this.state.currentTile}
            formData={this.state.formData}
            onChangeTile={this.onChangeTile}
            onClose={this.handleCloseEditor}
          />
        ) : (
          ''
        )}

        <Portal node={node}>
          <div>
            <small>Preview</small>
            <br />
            <Radio toggle onChange={this.setPreview} />
          </div>

          <div>
            <button onClick={() => this.onAddTile('text')}>Add Item</button>
          </div>
        </Portal>

        <Portal
          node={__CLIENT__ && document.getElementById('sidebar-metadata')}
        >
          <UiForm
            method="post"
            onSubmit={this.onSubmit}
            error={keys(this.state.errors).length > 0}
          >
            {map(schema.fieldsets, item => [
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
}

export default injectIntl(Form, { withRef: true });
