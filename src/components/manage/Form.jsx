import PropTypes from 'prop-types';
import React, { Component } from "react";
import { defineMessages, injectIntl, intlShape } from 'react-intl';
// GRID STUFF
import { Responsive } from "react-grid-layout";
import _ from "lodash";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ReactGridLayout = Responsive;

import { SizeMe } from 'react-sizeme'
// TILES STUFF
import { tiles } from '~/config';
import {
  Button,
  Form as UiForm,
  Segment,
  // Tab,
  // Message,
  Select,
  Modal,
  Grid,
  Radio,
} from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { Portal } from 'react-portal';
import { Field, Icon } from '@plone/volto/components'; // EditTile,
import {
  getTilesFieldname,
  getTilesLayoutFieldname,
} from '@plone/volto/helpers';
import AddNewTile from './Addnewtiles'
// OTHER STUFF
import { Resizable, ResizableBox } from 'react-resizable';
import '../css/edit.css';
import '../css/view.css';






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
    intl: intlShape,
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
    // Grid props
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
    onLayoutChange: () => { },
    // Tiles props
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

    if (formData === null) {
      // get defaults from schema
      formData = mapValues(props.schema.properties, 'default');
    }
    // defaults for block editor; should be moved to schema on server side
    if (!formData[tilesLayoutFieldname]) {
      formData[tilesLayoutFieldname] = {
        items: [ids.title, ids.description, ids.text],
        layout: null,
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

    this.state = {
      layout: [],
      newCounter: 0,
      cols: 12,
      formData,
      preview: false,
      modals: {}
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    // this.onChangeField = this.onChangeField.bind(this);
    // this.onChangeTile = this.onChangeTile.bind(this);
    this.onMutateTile = this.onMutateTile.bind(this);
    // this.onSelectTile = this.onSelectTile.bind(this);
    // this.onDeleteTile = this.onDeleteTile.bind(this);
    this.onAddTile = this.onAddTile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setPreview = this.setPreview.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderNavBar = this.renderNavBar.bind(this);

  }

  renderNavBar() {
    return (
      <div className="bp3-navbar bp3-dark">
        <div className="bp3-navbar-group bp3-button-group">

         
          <button
            className="bp3-button bp3-icon-arrow-top-right"
            onClick={() => this.onAddTile('text', -1, true)}
          >
            Add Tile
          </button>
        </div>
      </div>
    );
  }

  onAddTile(type, index) {
    console.log('doing on add tile');

    const id = uuid();
    const tilesFieldname = getTilesFieldname(this.state.formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);
    const totalItems = this.state.formData[tilesLayoutFieldname].items.length;
    const insert = index === -1 ? totalItems : index;

      // needed hackz. Might change it later
      console.log("adding", "n" + this.state.newCounter, this.state);
      this.setState({
        // Add a new item. It must have a unique key!
        layout: this.state.layout.concat({
          i: id,
          x: 0,
          y: Infinity, // puts it at the bottom
          w: this.state.cols || 2,
          h: 2
        }),
        // Increment the counter to ensure key is always unique.
        newCounter: this.state.newCounter + 1
      });
 
    this.setState({
      formData: {
        ...this.state.formData,
        [tilesLayoutFieldname]: {
          layout: this.state.layout.concat({
            i: id,
            x: 0,
            y: Infinity, // puts it at the bottom
            w: this.state.cols || 2,
            h: 2
          }),
          items: [
            ...this.state.formData[tilesLayoutFieldname].items.slice(0, insert),
           id,
            ...this.state.formData[tilesLayoutFieldname].items.slice(insert),
          ],
          layout: this.state.layout.concat({
            i: id,
            x: 0,
            y: Infinity, // puts it at the bottom
            w: this.state.cols || 2,
            h: 2
          }),
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
    // console.log(id)
    return id;
  }


  
  onMutateTile(id, value) {
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
          },
          [tilesLayoutFieldname]: {
            items: [
              ...this.state.formData[tilesLayoutFieldname].items.slice(
                0,
                index,
              ),
              ...this.state.formData[tilesLayoutFieldname].items.slice(index),
            ],
            layout: this.state.layout,
          },
        },
      },
      () => {
        console.log('mutated state', this.state);
      },
    );
  }


  handleOpen = (tileid) => this.setState({ modals: {...this.state.modals, [tileid]: true} })

  handleClose = (tileid) => this.setState({ modals: {...this.state.modals, [tileid]: false} })

  setPreview() {
    const newPreviewState = !this.state.preview;
    const body = document.querySelector('body');
    if (newPreviewState) {
      body.classList.add('mosaic-preview-body');
    } else {
      body.classList.remove('mosaic-preview-body');
    }
    this.setState({ preview: newPreviewState });
  }

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

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el}>
        assds
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    // this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    const tilesFieldname = getTilesFieldname(this.state.formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);

    this.setState({
      layout: _.reject(this.state.layout, { i: i }),
      formData: {
        ...this.state.formData,
        [tilesLayoutFieldname]: {
          items: without(this.state.formData[tilesLayoutFieldname].items, id),
          layout: _.reject(this.state.layout, { i: i }),
        },
        [tilesFieldname]: omit(this.state.formData[tilesFieldname], [id]),
      }
    });
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

  render() {
    return (
      <div className="ui wrapper">
        <button onClick={this.onAddTile}>Add Item</button>
        <SizeMe>
        {({ size }) => 
         <ReactGridLayout
         onLayoutChange={this.onLayoutChange}
         onBreakpointChange={this.onBreakpointChange}
         width={size.width || document.querySelector('main').offsetWidth}
         {...this.props}
       >
         {_.map(this.state.layout, el => this.createElement(el))}
        </ReactGridLayout>
        }
       
        </SizeMe>
        <Portal
          node={
            __CLIENT__ && document.querySelector('.toolbar .toolbar-actions')
          }
        >
          <div>
            <small>Preview</small>
            <br />
            <Radio toggle onChange={() => this.setPreview()} />
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

export default Form;
