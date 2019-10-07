import React, { Component } from 'react';
import { Button, Dropdown, Grid, Radio } from 'semantic-ui-react';

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
    this.sendAddTile = this.sendAddTile.bind(this);
    this.sendChangeScreenSize = this.sendChangeScreenSize.bind(this);
    this.sendDeleteLayout = this.sendDeleteLayout.bind(this);
    this.sendPreviewResponsive = this.sendPreviewResponsive.bind(this);
    this.sendPreviewTiles = this.sendPreviewTiles.bind(this);
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

  sendPreviewTiles(event, data) {
    this.props.dispatchToParent('PREVIEW_TILES', data.checked);
  }

  sendAddTile() {
    this.props.dispatchToParent('CREATE_TILE', null);
  }

  getAvailableScreens() {
    const layouts = this.props.layouts || {};
    const screens = this.props.availableScreens.map(el => {
      const res = Object.assign({}, el);
      const has = Object.keys(layouts).indexOf(el.value) > -1;
      // TODO: use appropriate icons, load fontawesome, something
      if (has) res.icon = 'check';
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

    return (
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <div>
              <Radio
                toggle
                checked={this.props.preview}
                onChange={this.sendPreviewTiles}
              />
              <small>Preview tiles</small>
            </div>
          </Grid.Column>

          <Grid.Column>
            <span>Select screen size</span>
            <Dropdown
              inline
              onChange={this.sendChangeScreenSize}
              options={this.getAvailableScreens()}
              selection
              value={this.state.currentScreenSize}
            />
          </Grid.Column>
          <Grid.Column>
            {showSaveButton ? (
              <Button onClick={this.sendSaveLayout}>
                Create responsive layout
              </Button>
            ) : (
              ''
            )}
            {showDeleteButton ? (
              <Button onClick={this.sendDeleteLayout}>
                Delete responsive layout
              </Button>
            ) : (
              ''
            )}
            {this.state.currentScreenSize === 'lg' ? (
              <Button onClick={this.sendAddTile}>Add new tile</Button>
            ) : (
              ''
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default LayoutToolbar;
