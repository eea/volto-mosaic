import React, { Component } from 'react';

import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { tiles } from '~/config';
import { Tab, Button, Modal, Grid } from 'semantic-ui-react';
import { Icon as VoltoIcon, TileChooser } from '@plone/volto/components';

import TileMetadataEditor from './TileMetadataEditor';

import penIcon from '@plone/volto/icons/pen.svg';
import clearIcon from '@plone/volto/icons/clear.svg';

// import PropTypes from 'prop-types';
// import TileDataEditor from './TileDataEditor';

class ModalEditor extends Component {
  constructor(props) {
    super(props);

    const tile = JSON.parse(
      JSON.stringify(props.formData['tiles'][props.tileid]),
    );

    this.state = {
      // tiles: props.tiles,
      tileid: props.tileid,
      formData: props.formData,
      tileData: tile,
      showTileChooser: false,
      activeTabPage: 0,
    };

    this.tileRef = React.createRef();

    this.renderEditTile = this.renderEditTile.bind(this);

    // this is ugly, should reduce number of similar methods
    this.onChangeTile = this.onChangeTile.bind(this);
    this.onMutateTile = this.onMutateTile.bind(this);
    this.handleMetadataChange = this.handleMetadataChange.bind(this);
    this.updateTileData = this.updateTileData.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);

    this.panes = [];
  }

  handleClickOutside = e => {
    if (this.ref && doesNodeContainClick(this.ref, e)) return;
    this.setState(() => ({
      showTileChooser: false,
    }));
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
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
    // handles editing inside the actual tile editor (ex: TinyMCE)
    this.setState({
      tileData: { ...value },
    });
  }

  onMutateTile(tile, choice) {
    // handles changing the tile type. Needed by the <Tile> component?
    this.setState({
      tileData: {
        ...this.state.tileData,
        ...choice,
      },
      showTileChooser: false,
      activeTabPage: 0,
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

  handleTabChange(e, { activeIndex }) {
    this.setState({
      activeTabPage: activeIndex,
    });
  }

  render() {
    return (
      <Modal open={true} size="fullscreen">
        <Modal.Content scrolling>
          <Tab
            onTabChange={this.handleTabChange}
            activeIndex={this.state.activeTabPage}
            menu={{
              secondary: true,
              pointing: true,
              attached: true,
              tabular: true,
            }}
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
                      tileData={this.state.tileData}
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
              <Button.Group floated="left">
                <Button
                  onClick={() => this.setState({ showTileChooser: true })}
                >
                  {this.state.tileData['@type']
                    ? tiles.tilesConfig[this.state.tileData['@type']].title
                    : 'Set type'}
                </Button>

                <div ref={node => (this.ref = node)}>
                  {this.state.showTileChooser && (
                    <TileChooser
                      onMutateTile={this.onMutateTile}
                      currentTile={this.state.tileData}
                    />
                  )}
                </div>
              </Button.Group>
            </Grid.Column>
            <Grid.Column>
              <Button.Group floated="right">
                <Button
                  basic
                  circular
                  primary
                  onClick={() => this.props.onClose(this.state.tileData)}
                >
                  <VoltoIcon name={penIcon} className="circled" />
                </Button>
                <Button
                  basic
                  circular
                  secondary
                  size="big"
                  onClick={() => this.props.onClose()}
                >
                  <VoltoIcon name={clearIcon} className="circled" />
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
