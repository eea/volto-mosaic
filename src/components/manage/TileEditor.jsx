import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { tiles } from '~/config';
import { Tab, Input, Button, Modal, Icon, Grid } from 'semantic-ui-react';
import { Icon as VoltoIcon } from '@plone/volto/components';

import SelectTileType from './SelectTileType';
import TileMetadataEditor from './TileMetadataEditor';

import showIcon from '@plone/volto/icons/show.svg';
import hideIcon from '@plone/volto/icons/hide.svg';

// import PropTypes from 'prop-types';
// import TileDataEditor from './TileDataEditor';

class ModalEditor extends Component {
  constructor(props) {
    super(props);

    const tile = JSON.parse(
      JSON.stringify(props.formData['tiles'][props.tileid]),
    );

    if (Object.keys(tile).indexOf('show_tile_title') === -1) {
      tile.show_tile_title = true;
      tile.tile_title = null;
    }

    this.state = {
      // tiles: props.tiles,
      tileid: props.tileid,
      formData: props.formData,
      tileData: tile,
      useRecommendedHeight: false,
      mosaic_title: tile.mosaic_title || tile['@type'],
    };

    this.tileRef = React.createRef();

    this.renderEditTile = this.renderEditTile.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);

    // this is ugly, should reduce number of similar methods
    this.onChangeTile = this.onChangeTile.bind(this);
    this.onMutateTile = this.onMutateTile.bind(this);
    this.handleMetadataChange = this.handleMetadataChange.bind(this);
    this.updateTileData = this.updateTileData.bind(this);
    this.toggleShowTitle = this.toggleShowTitle.bind(this);

    this.panes = [];
  }

  toggleShowTitle() {
    const show_tile_title = !this.state.tileData.show_tile_title;

    this.setState({
      tileData: {
        ...this.state.tileData,
        show_tile_title,
      },
    });
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
      <div>
        <label htmlFor="tile-title">Title:</label>
        <Input
          id="tile-title"
          type="text"
          defaultValue={this.state.tileData.tile_title || ''}
          onChange={(e, d) => this.updateTileData('tile_title', d.value)}
          icon={
            <Button
              color={this.state.tileData.show_tile_title ? 'green' : 'red'}
              onClick={this.toggleShowTitle}
            >
              <VoltoIcon
                size="20"
                name={this.state.tileData.show_tile_title ? showIcon : hideIcon}
              />
            </Button>
          }
        />

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
      </div>
    );
  }

  onChangeTile(id, value) {
    // handles editing inside the actual tile editor
    // console.log('Changing tile', value);
    this.setState({
      tileData: { ...value },
    });
  }

  onSave() {
    // const node = ReactDOM.findDOMNode(this);
    //
    // console.log('height', this.tileRef.current.height);
    // console.log('brect', .getBoundingClientRect());
    if (!this.state.useRecommendedHeight) {
      this.props.onClose(this.state.tileData);
      return;
    }
    let type = this.state.tileData['@type'].toLowerCase();
    const minHeight = tiles.tilesConfig[type].height;

    const node = ReactDOM.findDOMNode(this.tileRef.current);
    let size = {
      height: minHeight,
      width: node.offsetWidth,
    };
    this.props.onClose(this.state.tileData, size);
  }

  onCancel() {
    this.props.onClose();
  }

  onMutateTile(type) {
    // handles changing the tile type. Needed by the <Tile> component?
    // console.log('Mutating tile type', type);
    this.setState({
      tileData: {
        ...this.state.tileData,
        '@type': type,
      },
    });
  }

  handleMetadataChange(values) {
    // handles changes coming from the metadata editor

    let tileData = this.state.tileData;
    this.setState(
      {
        tileData: {
          ...tileData,
          ...values,
        },
      },
      () => {
        // console.log('State after handleMetadataChange', this.state);
      },
    );
  }

  updateTileData(name, data) {
    let tileData = this.state.tileData;
    // TODO: check if this doesn't introduce extra render of tile editor

    this.setState({
      tileData: {
        ...tileData,
        [name]: data,
      },
    });
  }

  render() {
    return (
      <Modal open={true}>
        <Modal.Header>
          <label htmlFor="mosaic-title">Tile name:</label>
          <Input
            id="mosaic-title"
            type="text"
            defaultValue={this.state.mosaic_title}
            onChange={(e, d) => this.updateTileData('mosaic_title', d.value)}
          />
        </Modal.Header>
        <Modal.Content>
          <Tab
            menu={{ fluid: true, tabular: 'top' }}
            panes={[
              {
                menuItem: 'Data',
                render: () => <Tab.Pane>{this.renderEditTile()}</Tab.Pane>,
              },
              {
                menuItem: 'Metadata',
                render: () => (
                  <Tab.Pane>
                    <TileMetadataEditor
                      onDataChange={this.handleMetadataChange}
                      tile={this.state.tileData}
                    />
                  </Tab.Pane>
                ),
              },
            ]}
          />
        </Modal.Content>
        <Modal.Actions>
          <Grid columns={2}>
            <Grid.Column style={{ textAlign: 'left' }}>
              <Button
                onClick={() => this.setState({ useRecommendedHeight: true })}
              >
                Use recommended height
              </Button>
              {this.state.useRecommendedHeight ? <Icon name="check" /> : ''}
              <label htmlFor="select-tile-type">Set type:</label>
              <SelectTileType
                id="select-tile-type"
                tiles={this.state.formData.tiles}
                tile={this.state.tileData}
                onMutateTile={this.onMutateTile}
              />
            </Grid.Column>
            <Grid.Column>
              <Button.Group floated="right">
                <Button color="green" onClick={this.onSave}>
                  Save
                </Button>
                <Button color="red" onClick={this.onCancel}>
                  Cancel
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalEditor;
