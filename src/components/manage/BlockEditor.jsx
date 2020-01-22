import React, { Component } from 'react';

import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { blocks } from '~/config';
import { Tab, Button, Modal, Grid } from 'semantic-ui-react';
import { Icon as VoltoIcon, BlockChooser } from '@plone/volto/components';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import BlockMetadataEditor from './BlockMetadataEditor';

import penIcon from '@plone/volto/icons/pen.svg';
import clearIcon from '@plone/volto/icons/clear.svg';
import { BodyClass } from '@plone/volto/helpers';

// import PropTypes from 'prop-types';
// import blockDataEditor from './blockDataEditor';

class ModalEditor extends Component {
  constructor(props) {
    super(props);

    const block = JSON.parse(
      JSON.stringify(props.formData['blocks'][props.blockid]),
    );

    this.state = {
      // blocks: props.blocks,
      blockid: props.blockid,
      formData: props.formData,
      blockData: block,
      showBlockChooser: false,
      activeTabPage: 0,
    };

    this.blockRef = React.createRef();

    this.renderEditBlock = this.renderEditBlock.bind(this);

    // this is ugly, should reduce number of similar methods
    this.onChangeBlock = this.onChangeBlock.bind(this);
    this.onMutateBlock = this.onMutateBlock.bind(this);
    this.handleMetadataChange = this.handleMetadataChange.bind(this);
    this.updateblockData = this.updateblockData.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);

    this.panes = [];
  }

  handleClickOutside = e => {
    if (this.ref && doesNodeContainClick(this.ref, e)) return;
    this.setState(() => ({
      showBlockChooser: false,
    }));
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  renderEditBlock() {
    // const { formData } = this.state; // destructuring
    // const blocksFieldname = getBlocksFieldname(formData);
    // const blocksDict = formData[blocksFieldname];

    let Block = null;
    let type = this.state.blockData['@type'].toLowerCase();
    Block = blocks.blocksConfig[type].edit;

    let nop = () => {};

    return (
      <Block
        id={this.state.blockid}
        block={this.state.blockid}
        data={this.state.blockData}
        properties={this.state.formData}
        onAddBlock={nop}
        onChangeBlock={this.onChangeBlock}
        onMutateBlock={nop}
        onChangeField={nop}
        onDeleteBlock={nop}
        onSelectBlock={nop}
        handleKeyDown={nop}
        pathname={this.props.pathname}
        onMoveBlock={nop}
        onFocusPreviousBlock={nop}
        onFocusNextBlock={nop}
        selected={true}
        index={0}
        ref={this.blockRef}
        blockNode={this.state.blockData}

        // id={this.state.blockid}
        // index={0}
        // type={blocksDict[this.state.blockid]['@type']}
        // key={this.state.blockid}
        // handleKeyDown={()=>{}}
        // onAddBlock={this.onAddBlock}
        // onChangeBlock={this.onChangeBlock}
        // onMutateBlock={this.onMutateBlock}
        // onChangeField={this.onChangeField}
        // onDeleteBlock={this.onDeleteBlock}
        // onSelectBlock={() => {}}
        // onMoveBlock={this.onMoveBlock}
        // onFocusPreviousBlock={this.onFocusPreviousBlock}
        // onFocusNextBlock={this.onFocusNextBlock}
        // properties={formData}
        // data={blocksDict[this.state.blockid]}
        // pathname={this.props.pathname}
        // block={this.state.blockid}
        // selected={this.state.selected === this.state.blockid}
      />
    );
  }

  onChangeBlock(id, value) {
    // handles editing inside the actual block editor (ex: TinyMCE)
    this.setState({
      blockData: { ...value },
    });
  }

  onMutateBlock(block, choice) {
    // handles changing the block type. Needed by the <Block> component?
    this.setState({
      blockData: {
        ...this.state.blockData,
        ...choice,
      },
      showBlockChooser: false,
      activeTabPage: 0,
    });
  }

  handleMetadataChange(values) {
    // handles changes coming from the metadata editor

    let blockData = this.state.blockData;
    this.setState({
      blockData: {
        ...blockData,
        ...values,
      },
    });
  }

  updateblockData(name, data) {
    let blockData = this.state.blockData;
    // TODO: check if this doesn't introduce extra render of block editor

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
    const selectedBlock = blocks.blocksConfig[this.state.blockData['@type']];

    return (
      <Modal className="mosaic-modal" open={true} size="fullscreen">
        <BodyClass className="mosaic-page-modal-open" />
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
                render: () => (
                  <Tab.Pane>
                    <div className="editor-toolbar-wrapper" />
                    {this.renderEditBlock()}
                  </Tab.Pane>
                ),
              },
              {
                menuItem: 'Metadata',
                render: () => (
                  <Tab.Pane>
                    <BlockMetadataEditor
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
                  onClick={() => this.setState({ showBlockChooser: true })}
                >
                  {this.state.blockData['@type'] && selectedBlock
                    ? selectedBlock.title
                    : 'Set type'}
                </Button>

                <div ref={node => (this.ref = node)}>
                  {this.state.showBlockChooser && (
                    <BlockChooser
                      onMutateBlock={this.onMutateBlock}
                      currentBlock={this.state.blockData['@type']}
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
