import React, { Component } from 'react';
import { Button, Dropdown, Grid, Radio } from 'semantic-ui-react';

class LayoutToolbar extends Component {
  static defaultProps = {
    // screens,
  };

  constructor(props) {
    super(props);

    console.log('Layout toolbar props', props);

    this.state = {
      currentScreenSize: 'lg',
    };

    this.sendChangeScreenSize = this.sendChangeScreenSize.bind(this);
    this.sendPreviewResponsive = this.sendPreviewResponsive.bind(this);
    this.sendAddTile = this.sendAddTile.bind(this);
    this.sendDeleteLayout = this.sendDeleteLayout.bind(this);
    this.sendSaveLayout = this.sendSaveLayout.bind(this);
    this.sendPreviewTiles = this.sendPreviewTiles.bind(this);
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

  render() {
    let showSaveButton = true;
    let showDeleteButton = true;

    const keys = Object.keys(this.props.availableScreens);
    const isActiveLayout = keys.indexOf(this.currentScreenSize) > -1;

    if (this.state.currentScreenSize === 'lg') {
      // don't show on desktop
      showSaveButton = false;
      showDeleteButton = false;
    } else if (isActiveLayout) {
      // current layout exists
      showSaveButton = false;
    } else {
      // new layout can be created
      showDeleteButton = false;
    }

    return (
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <div>
              <Radio toggle onChange={this.sendPreviewResponsive} />
              <small>Preview responsive layout</small>
            </div>
            <div>
              <Radio toggle onChange={this.sendPreviewTiles} />
              <small>Preview tiles</small>
            </div>
          </Grid.Column>

          <Grid.Column>
            <span>Select screen size</span>
            <Dropdown
              inline
              onChange={this.sendChangeScreenSize}
              options={this.props.availableScreens}
              selection
              value={this.state.currentScreenSize}
            />
          </Grid.Column>
          <Grid.Column>
            {showSaveButton ? (
              <Button onClick={this.sendSaveLayout}>
                Save responsive layout
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
            <button onClick={this.sendAddTile}>Add new tile</button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default LayoutToolbar;
