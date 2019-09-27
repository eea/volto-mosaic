import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { tiles } from '~/config';
import {
  Button,
  Modal,

  // Container,
  // Form as UiForm,
  // Segment,
  // Tab,
  // Message,
  // Select,
  // Radio,
} from 'semantic-ui-react';
// import {
//   getTilesFieldname,
//   // getTilesLayoutFieldname,
// } from '@plone/volto/helpers';

import SelectTileType from './SelectTileType';

class ModalEditor extends Component {
  constructor(props) {
    super(props);

    const tile = props.formData['tiles'][props.tileid];
    this.state = {
      // tiles: props.tiles,
      tileid: props.tileid,
      formData: props.formData,
      tileData: tile,
    };

    this.tileRef = React.createRef();

    this.renderEditTile = this.renderEditTile.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChangeTile = this.onChangeTile.bind(this);
    this.onMutateTile = this.onMutateTile.bind(this);
  }

  renderEditTile() {
    // const { formData } = this.state; // destructuring
    // const tilesFieldname = getTilesFieldname(formData);
    // const tilesDict = formData[tilesFieldname];

    let Tile = null;
    let type = this.state.tileData['@type'].toLowerCase();
    Tile = tiles.tilesConfig[type].edit;

    let nop = () => {};

    return (
      <Tile
        id={this.state.tileid}
        tile={this.state.tileid}
        data={this.state.tileData}
        properties={this.state.formData}
        onAddTile={nop}
        onChangeTile={this.onChangeTile}
        onMutateTile={nop}
        onChangeField={nop}
        onDeleteTile={nop}
        onSelectTile={nop}
        handleKeyDown={nop}
        pathname={this.props.pathname}
        onMoveTile={nop}
        onFocusPreviousTile={nop}
        onFocusNextTile={nop}
        selected={true}
        index={0}
        ref={this.tileRef}
      />
    );
  }

  onChangeTile(id, value) {
    console.log('Changing tile', value);
    this.setState({
      tileData: value,
    });
  }

  onSave() {
    // const node = ReactDOM.findDOMNode(this);
    //
    // console.log('height', this.tileRef.current.height);
    // console.log('brect', .getBoundingClientRect());

    const node = ReactDOM.findDOMNode(this.tileRef.current);
    let size = {
      height: node.offsetHeight,
      width: node.offsetWidth,
    };
    this.props.onClose(this.state.tileData, size);
  }

  onCancel() {
    this.props.onClose();
  }

  onMutateTile(type) {
    console.log('Mutating tile type', type);
    this.setState({
      tileData: {
        ...this.state.tileData,
        '@type': type,
      },
    });
  }

  render() {
    return (
      <Modal closeIcon open={true}>
        {/* <Modal.Header> */}
        {/* </Modal.Header> */}
        <Modal.Content>{this.renderEditTile()}</Modal.Content>
        <Modal.Actions>
          <SelectTileType
            tiles={this.state.formData.tiles}
            tile={this.state.tileData}
            onMutateTile={this.onMutateTile}
          />
          <Button color="green" onClick={this.onSave}>
            Save
          </Button>
          <Button color="red" onClick={this.onCancel}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalEditor;
