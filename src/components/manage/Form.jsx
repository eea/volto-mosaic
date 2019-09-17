/**
 * Form component.
 * @module components/manage/Form/Form
 */

// import { IconNames } from '@blueprintjs/icons';
// import classNames from 'classnames';
// import { Classes, HTMLSelect } from '@blueprintjs/core';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import dropRight from 'lodash/dropRight';
// import classNames from 'classnames';

import {
  Corner,
  // createBalancedTreeFromLeaves,
  // getLeaves,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  Mosaic,
  // MosaicDirection,
  // MosaicNode,
  // MosaicParent,
  MosaicWindow,
  MosaicZeroState,
  updateTree,
  SplitButton,
  ExpandButton,
  RemoveButton,
  Separator,
} from 'react-mosaic-component';

import { tiles } from '~/config';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keys, map, mapValues, omit, uniq, without } from 'lodash';
// import move from 'lodash-move';
import {
  Button,
  Form as UiForm,
  Segment,
  // Tab,
  // Message,
} from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { v4 as uuid } from 'uuid';
import { Portal } from 'react-portal';

import { Field, Icon } from '@plone/volto/components'; // EditTile,
import {
  getTilesFieldname,
  getTilesLayoutFieldname,
} from '@plone/volto/helpers';

// import addSVG from '@plone/volto/icons/circle-plus.svg';
import cameraSVG from '@plone/volto/icons/camera.svg';
import videoSVG from '@plone/volto/icons/videocamera.svg';
import textSVG from '@plone/volto/icons/text.svg';
import { Resizable, ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

// import aheadSVG from '@plone/volto/icons/ahead.svg';
// import clearSVG from '@plone/volto/icons/clear.svg';

export const THEMES = {
  Blueprint: 'mosaic-blueprint-theme',
};

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

class AddNewTile extends Component {
  static propTypes = {
    onMutateTile: PropTypes.func,
    tile: PropTypes.string,
  };

  constructor(props) {
    super(props);
    let availableTiles = [
      {
        title: 'text',
        icon: textSVG,
      },
      {
        title: 'video',
        icon: videoSVG,
      },
      {
        title: 'image',
        icon: cameraSVG,
      },
      ...tiles.customTiles,
    ];
    this.state = {
      availableTiles,
    };
  }

  render() {
    return (
      <div className="add-tile toolbar">
        <Button.Group>
          {this.state.availableTiles.map(tile => (
            <Button
              key={tile.title}
              icon
              basic
              onClick={() =>
                this.props.onMutateTile(this.props.tile, {
                  '@type': tile.title,
                })
              }
            >
              <Icon name={tile.icon} size="24px" />
              {/* <span>{tile.title}</span> */}
            </Button>
          ))}
        </Button.Group>
      </div>
    );
  }
}

/**
 * Form container class.
 * @class Form
 * @extends Component
 */
class Form extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
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

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
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
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Form
   */
  constructor(props) {
    super(props);
    const ids = {
      title: uuid(),
      description: uuid(),
      text: uuid(),
    };
    let { formData } = props;
    const tilesFieldname = getTilesFieldname(formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(formData);

    let defaultLayoutHeight =
      formData[tilesLayoutFieldname].layout_height || 500;

    if (formData === null) {
      // get defaults from schema
      formData = mapValues(props.schema.properties, 'default');
    }
    // defaults for block editor; should be moved to schema on server side
    if (!formData[tilesLayoutFieldname]) {
      formData[tilesLayoutFieldname] = {
        items: [ids.title, ids.description, ids.text],
        layout: null,
        layout_height: defaultLayoutHeight,
      };
    }
    if (!formData[tilesFieldname]) {
      formData[tilesFieldname] = {
        [ids.title]: {
          '@type': 'title',
        },
        [ids.description]: {
          '@type': 'description',
        },
        [ids.text]: {
          '@type': 'text',
        },
      };
    }

    let currentNode = formData[tilesLayoutFieldname].layout;

    this.state = {
      formData,
      errors: {},
      selected:
        formData[tilesLayoutFieldname].items.length > 0
          ? formData[tilesLayoutFieldname].items[0]
          : null,
      currentNode,
      height: defaultLayoutHeight,
    };
    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeTile = this.onChangeTile.bind(this);
    this.onMutateTile = this.onMutateTile.bind(this);
    this.onSelectTile = this.onSelectTile.bind(this);
    this.onDeleteTile = this.onDeleteTile.bind(this);
    this.onAddTile = this.onAddTile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // this.onMoveTile = this.onMoveTile.bind(this);
    // this.onFocusPreviousTile = this.onFocusPreviousTile.bind(this);
    // this.onFocusNextTile = this.onFocusNextTile.bind(this);
    // this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * Change field handler
   * @method onChangeField
   * @param {string} id Id of the field
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  onChangeField(id, value) {
    this.setState({
      formData: {
        ...this.state.formData,
        [id]: value || null,
      },
    });
  }

  /**
   * Change tile handler
   * @method onChangeTile
   * @param {string} id Id of the tile
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  onChangeTile(id, value) {
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

  /**
   * Change tile handler
   * @method onMutateTile
   * @param {string} id Id of the tile
   * @param {*} value Value of the field
   * @returns {undefined}
   */
  // TODO: reimplement this
  onMutateTile(id, value) {
    const idTrailingTile = uuid();
    const tilesFieldname = getTilesFieldname(this.state.formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);
    const index =
      this.state.formData[tilesLayoutFieldname].items.indexOf(id) + 1;

    this.setState(
      {
        formData: {
          ...this.state.formData,
          [tilesFieldname]: {
            ...this.state.formData[tilesFieldname],
            [id]: value || null,
            [idTrailingTile]: {
              '@type': 'text',
            },
          },
          [tilesLayoutFieldname]: {
            items: [
              ...this.state.formData[tilesLayoutFieldname].items.slice(
                0,
                index,
              ),
              idTrailingTile,
              ...this.state.formData[tilesLayoutFieldname].items.slice(index),
            ],
            layout: this.state.currentNode,
            layout_height: this.state.height,
          },
        },
      },
      () => {
        console.log('mutated state', this.state);
      },
    );
  }

  /**
   * Select tile handler
   * @method onSelectTile
   * @param {string} id Id of the field
   * @returns {undefined}
   */
  onSelectTile(id) {
    this.setState({
      selected: id,
    });
  }

  /**
   * Delete tile handler
   * @method onDeleteTile
   * @param {string} id Id of the field
   * @param {bool} selectPrev True if previous should be selected
   * @returns {undefined}
   */
  onDeleteTile(id, selectPrev) {
    const tilesFieldname = getTilesFieldname(this.state.formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);

    this.setState({
      formData: {
        ...this.state.formData,
        [tilesLayoutFieldname]: {
          items: without(this.state.formData[tilesLayoutFieldname].items, id),
          layout: this.state.currentNode,
          layout_height: this.state.height,
        },
        [tilesFieldname]: omit(this.state.formData[tilesFieldname], [id]),
      },
      selected: selectPrev
        ? this.state.formData[tilesLayoutFieldname].items[
            this.state.formData[tilesLayoutFieldname].items.indexOf(id) - 1
          ]
        : null,
    });
  }

  /**
   * Add tile handler
   * @method onAddTile
   * @param {string} type Type of the tile
   * @param {Number} index Index where to add the tile
   * @returns {string} Id of the tile
   */
  onAddTile(type, index) {
    console.log('doing on add tile');

    const id = uuid();
    const tilesFieldname = getTilesFieldname(this.state.formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);
    const totalItems = this.state.formData[tilesLayoutFieldname].items.length;
    const insert = index === -1 ? totalItems : index;

    let { currentNode } = this.state;

    if (currentNode) {
      const path = getPathToCorner(currentNode, Corner.TOP_RIGHT);
      const parent = getNodeAtPath(currentNode, dropRight(path));
      const destination = getNodeAtPath(currentNode, path);
      const direction = parent ? getOtherDirection(parent.direction) : 'row';

      let first;
      let second;
      if (direction === 'row') {
        first = destination;
        second = id;
      } else {
        first = id;
        second = destination;
      }

      currentNode = updateTree(currentNode, [
        {
          path,
          spec: {
            $set: {
              direction,
              first,
              second,
            },
          },
        },
      ]);
    } else {
      currentNode = id;
    }

    this.setState({
      formData: {
        ...this.state.formData,
        [tilesLayoutFieldname]: {
          items: [
            ...this.state.formData[tilesLayoutFieldname].items.slice(0, insert),
            id,
            ...this.state.formData[tilesLayoutFieldname].items.slice(insert),
          ],
          layout: currentNode,
          layout_height: this.state.height,
        },
        [tilesFieldname]: {
          ...this.state.formData[tilesFieldname],
          [id]: {
            '@type': type,
          },
        },
      },
      selected: id,
    });

    return id;
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {Object} event Event object.
   * @returns {undefined}
   */
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

  renderEditTile(tileid) {
    const { formData } = this.state; // destructuring
    const tilesFieldname = getTilesFieldname(formData);
    const tilesDict = formData[tilesFieldname];

    let Tile = null;
    let type = tilesDict[tileid]['@type'];
    Tile = tiles.defaultTilesEditMap[type];

    let data = tilesDict[tileid];

    let nop = () => {};

    return (
      <Tile
        id={tileid}
        tile={tileid}
        data={data}
        properties={formData}
        onAddTile={nop}
        onChangeTile={this.onChangeTile}
        onMutateTile={nop}
        onChangeField={nop}
        onDeleteTile={nop}
        onSelectTile={nop}
        onMoveTile={nop}
        onFocusPreviousTile={nop}
        onFocusNextTile={nop}
        selected={true}
        index={0}
      />
    );
  }

  createNode = () => {
    const newNode = this.onAddTile('text', 0);
    return newNode;
  };

  onChange = currentNode => {
    // this.setState({  });
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);

    this.setState(
      {
        currentNode,
        formData: {
          ...this.state.formData,
          [tilesLayoutFieldname]: {
            ...this.state.formData[tilesLayoutFieldname],
            layout: currentNode,
            layout_height: this.state.height,
          },
        },
      },
      () => console.log('State after onChange', this.state),
    );
  };

  // additionalControls = (tile, onMutateTile) => [
  //   <AddNewTile onMutateTile={onMutateTile} tile={tile} />,
  // ];

  onResize = (event, { element, size, handle }) => {
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);

    this.setState({
      height: size.height,
      formData: {
        ...this.state.formData,
        [tilesLayoutFieldname]: {
          ...this.state.formData[tilesLayoutFieldname],
          layout_height: this.state.height,
        },
      },
    });
  };

  getToolbar = (tileid, onMutateTile) => {
    const { formData } = this.state;
    const tilesFieldname = getTilesFieldname(formData);
    const tileType = this.state.formData[tilesFieldname][tileid]['@type'];

    let titlediv = <div className="mosaic-window-title">Tile: {tileType}</div>;

    return (props, draggable) => {
      return (
        <div
          key={tileid}
          className="mosaic-window-toolbar"
          style={{ width: '100%' }}
        >
          {titlediv}
          <div className="mosaic-window-controls">
            <Separator />
            <AddNewTile onMutateTile={onMutateTile} tile={tileid} />
            <Separator />
            <SplitButton />
            <ExpandButton />
            <RemoveButton />
          </div>
        </div>
      );
    };
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { schema } = this.props; // , onCancel, onSubmit

    return (
      <div className="ui wrapper">
        <ResizableBox
          width={200}
          height={this.state.height}
          minConstraints={[100, 100]}
          onResize={this.onResize}
        >
          <Mosaic
            renderTile={(tileid, path) => (
              <MosaicWindow
                // <number>
                title="Window"
                createNode={this.createNode}
                path={path}
                onDragStart={() => console.log('MosaicWindow.onDragStart')}
                onDragEnd={type => console.log('MosaicWindow.onDragEnd', type)}
                renderToolbar={this.getToolbar(tileid, this.onMutateTile)}
                key={tileid}
              >
                {this.renderEditTile(tileid)}
              </MosaicWindow>
            )}
            zeroStateView={<MosaicZeroState createNode={this.createNode} />}
            value={this.state.currentNode}
            onChange={this.onChange}
            onRelease={this.onRelease}
            className={THEMES[this.state.currentTheme]}
          />
        </ResizableBox>

        <Portal
          node={__CLIENT__ && document.getElementById('sidebar-metadata')}
        >
          <UiForm
            method="post"
            onSubmit={this.onSubmit}
            error={keys(this.state.errors).length > 0}
          >
            {map(schema.fieldsets, item => [
              <React.Fragment key={item}>
                <Segment secondary attached>
                  {item.title}
                </Segment>
                ,
                <Segment attached>
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
                </Segment>
                ,
              </React.Fragment>,
            ])}
          </UiForm>
        </Portal>
      </div>
    );
  }
}

export default injectIntl(Form, { withRef: true });
