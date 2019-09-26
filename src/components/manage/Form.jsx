import PropTypes from 'prop-types';
import React, { Component } from "react";
import { defineMessages, injectIntl, intlShape } from 'react-intl';
// GRID STUFF
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
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
      items: [],
      newCounter: 0,
      cols: 12,
      formData,
      preview: false,
      modals: {}
    };
    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    // this.onChangeField = this.onChangeField.bind(this);
    // this.onChangeTile = this.onChangeTile.bind(this);
    // this.onMutateTile = this.onMutateTile.bind(this);
    // this.onSelectTile = this.onSelectTile.bind(this);
    // this.onDeleteTile = this.onDeleteTile.bind(this);
    this.onAddTile = this.onAddTile.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    // this.setPreview = this.setPreview.bind(this);
    // this.handleOpen = this.handleOpen.bind(this);
    // this.handleClose = this.handleClose.bind(this);
    // this.renderNavBar = this.renderNavBar.bind(this);

  }

  onAddTile(type, index, column) {
    console.log('doing on add tile');

    const id = uuid();
    const tilesFieldname = getTilesFieldname(this.state.formData);
    const tilesLayoutFieldname = getTilesLayoutFieldname(this.state.formData);
    const totalItems = this.state.formData[tilesLayoutFieldname].items.length;

    // this.setState({
    //   formData: {
    //     ...this.state.formData,
    //     [tilesLayoutFieldname]: {
    //       items: [
    //         ...this.state.formData[tilesLayoutFieldname].items.slice(0, insert),
    //         id,
    //         ...this.state.formData[tilesLayoutFieldname].items.slice(insert),
    //       ],
    //       layout: currentNode,
    //       layout_height: this.state.height,
    //     },
    //     [tilesFieldname]: {
    //       ...this.state.formData[tilesFieldname],
    //       [id]: {
    //         '@type': type,
    //       },
    //     },
    //   },
    //   selected: id,
    // }, this.onChange(currentNode));
    // console.log(id)
    return id;
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

  onAddItem() {
    // needed hackz. Might change it later
    this.onBreakpointChange(this.state.breakpoint, this.state.cols)
    console.log("adding", "n" + this.state.newCounter, this.state);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: 0,
        y: Infinity, // puts it at the bottom
        w: this.state.cols || 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
    console.log(this.state.items)
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
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
    return (
      <div>
        <button onClick={this.onAddItem}>Add Item</button>
        <SizeMe>
        {({ size }) => 
         <ReactGridLayout
         onLayoutChange={this.onLayoutChange}
         onBreakpointChange={this.onBreakpointChange}
         width={size.width}
         {...this.props}
       >
         {_.map(this.state.items, el => this.createElement(el))}
        </ReactGridLayout>
        }
       
        </SizeMe>
      </div>
    );
  }
}

export default Form;
