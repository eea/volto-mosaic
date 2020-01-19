import { Icon as VoltoIcon } from '@plone/volto/components';
import React, { Component } from 'react';
import { Button, Dropdown, Segment, Checkbox, Grid } from 'semantic-ui-react';
import checkIcon from '@plone/volto/icons/check.svg';
import FormField from './FormField';

class LayoutToolbar extends Component {
  static defaultProps = {
    // screens,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentScreenSize: 'lg',
    };

    this.getAvailableScreens = this.getAvailableScreens.bind(this);
    this.sendAddBlock = this.sendAddBlock.bind(this);
    this.sendChangeScreenSize = this.sendChangeScreenSize.bind(this);
    this.sendDeleteLayout = this.sendDeleteLayout.bind(this);
    this.sendPreviewResponsive = this.sendPreviewResponsive.bind(this);
    this.sendPreviewBlocks = this.sendPreviewBlocks.bind(this);
    this.sendSaveLayout = this.sendSaveLayout.bind(this);
  }

  sendChangeScreenSize(event, data) {
    this.setState({ currentScreenSize: data.value }, () =>
      this.props.dispatchToParent('CHANGE_SCREEN_SIZE', data.value),
    );
  }

  sendPreviewResponsive(event, data) {
    this.props.dispatchToParent('PREVIEW_RESPONSIVE', data.checked);
  }

  sendDeleteLayout() {
    this.props.dispatchToParent('DELETE_LAYOUT', this.state.currentScreenSize);
  }

  sendSaveLayout() {
    this.props.dispatchToParent('CREATE_LAYOUT', this.state.currentScreenSize);
  }

  sendPreviewBlocks(event, data) {
    this.props.dispatchToParent('PREVIEW_TILES', data.checked);
  }

  sendAddBlock() {
    this.props.dispatchToParent('CREATE_TILE', null);
  }

  getAvailableScreens() {
    const layouts = this.props.layouts || {};
    const screens = this.props.availableScreens.map(el => {
      const res = Object.assign({}, el);
      const has = Object.keys(layouts).indexOf(el.value) > -1;
      // TODO: use appropriate icons, load fontawesome, something
      if (has) res.icon = <VoltoIcon name={checkIcon} size="10" />;
      return res;
    });
    return screens;
  }

  render() {
    const layouts = this.props.layouts || {};
    const currentScreenSize = this.state.currentScreenSize;

    const has = Object.keys(layouts).indexOf(currentScreenSize) > -1;

    let showSaveButton;
    let showDeleteButton;

    if (currentScreenSize === 'lg') {
      showSaveButton = false;
      showDeleteButton = false;
    } else {
      showSaveButton = has ? false : true;
      showDeleteButton = has ? true : false;
    }
    // defaultChecked={this.props.preview}

    return (
      <Segment.Group raised>
        <header className="header pulled">
          <h2>Mosaic Layout</h2>
        </header>

        <Segment secondary>
          <Grid columns="two">
            <Grid.Column>
              <Checkbox
                toggle
                id="preview-toggle"
                onChange={(ev, data) => {
                  console.log('pvewi toggle');
                  return this.sendPreviewBlocks(ev, data);
                }}
                label="Preview blocks"
              />
            </Grid.Column>
            <Grid.Column>
              <Button
                onClick={this.sendAddBlock}
                disabled={this.state.currentScreenSize !== 'lg'}
              >
                Add block
              </Button>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <FormField id="select-screensize" title="Select screen size">
            <Dropdown
              inline
              onChange={this.sendChangeScreenSize}
              options={this.getAvailableScreens()}
              selection
              value={this.state.currentScreenSize}
            />
          </FormField>
          {showSaveButton || showDeleteButton ? (
            <FormField id="save-responsive" title="">
              {showSaveButton && (
                <Button size="mini" onClick={this.sendSaveLayout}>
                  Create responsive layout
                </Button>
              )}
              {showDeleteButton && (
                <Button size="mini" onClick={this.sendDeleteLayout}>
                  Delete responsive layout
                </Button>
              )}
            </FormField>
          ) : (
            ''
          )}
        </Segment>
        <Segment>
          <FormField title="Zoom" id="zoom-mosaic">
            <Button.Group size="mini">
              <Button size="mini" active>
                25%
              </Button>
              <Button size="mini">50%</Button>
              <Button size="mini">75%</Button>
              <Button size="mini">100%</Button>
            </Button.Group>
          </FormField>
        </Segment>
      </Segment.Group>
    );
  }
}

export default LayoutToolbar;
