import React, { Component } from 'react';

import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { blocks } from '~/config';
import { Tab, Button, Modal, Grid } from 'semantic-ui-react';
import { Icon as VoltoIcon, BlockChooser } from '@plone/volto/components';

import TileMetadataEditor from './TileMetadataEditor';

import penIcon from '@plone/volto/icons/pen.svg';
import clearIcon from '@plone/volto/icons/clear.svg';

// import PropTypes from 'prop-types';
// import blockDataEditor from './blockDataEditor';

class ModalEditor extends Component {
  constructor(props) {
    super(props);

    const tile = JSON.parse(
      JSON.stringify(props.formData['blocks'][props.tileid]),
    );

    this.state = {
      // blocks: props.blocks,
      tileid: props.tileid,
      formData: props.formData,
      blockData: tile,
      showTileChooser: false,
      activeTabPage: 0,
    };

    this.tileRef = React.createRef();

    this.renderEditTile = this.renderEditTile.bind(this);

    // this is ugly, should reduce number of similar methods
    this.onChangeTile = this.onChangeTile.bind(this);
    this.onMutateBlock = this.onMutateBlock.bind(this);
    this.handleMetadataChange = this.handleMetadataChange.bind(this);
    this.updateblockData = this.updateblockData.bind(this);
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
    // const tilesFieldname = getBlocksFieldname(formData);
    // const tilesDict = formData[tilesFieldname];

    let Tile = null;
    let type = this.state.blockData['@type'].toLowerCase();
    Tile = blocks.blocksConfig[type].edit;

    let nop = () => {};

    return (
      <Tile
        id={this.state.tileid}
        tile={this.state.tileid}
        data={this.state.blockData}
        properties={this.state.formData}
        onAddBlock={nop}
        onChangeTile={this.onChangeTile}
        onMutateBlock={nop}
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
      blockData: { ...value },
    });
  }

  onMutateBlock(tile, choice) {
    // handles changing the tile type. Needed by the <Tile> component?
    this.setState({
      blockData: {
        ...this.state.blockData,
        ...choice,
      },
      showTileChooser: false,
      activeTabPage: 0,
    });
  }

  handleMetadataChange(values) {
    // handles changes coming from the metadata editor

    let blockData = this.state.blockData;
    this.setState(
      {
        blockData: {
          ...blockData,
          ...values,
        },
      },
      () => {
        // console.log('State after handleMetadataChange', this.state);
      },
    );
  }

  updateblockData(name, data) {
    let blockData = this.state.blockData;
    // TODO: check if this doesn't introduce extra render of tile editor

    this.setState({
      blockData: {
        ...blockData,
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
                      blockData={this.state.blockData}
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
                  {this.state.blockData['@type']
                    ? blocks.blocksConfig[this.state.blockData['@type']].title
                    : 'Set type'}
                </Button>

                <div ref={node => (this.ref = node)}>
                  {this.state.showTileChooser && (
                    <BlockChooser
                      onMutateBlock={this.onMutateBlock}
                      currentTile={this.state.blockData}
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
                  onClick={() => this.props.onClose(this.state.blockData)}
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
