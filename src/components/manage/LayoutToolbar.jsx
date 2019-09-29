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

    this.handleChangeScreenSize = this.handleChangeScreenSize.bind(this);
    this.handlePreviewResponsive = this.handlePreviewResponsive.bind(this);
    this.deleteLayout = this.deleteLayout.bind(this);
    this.saveLayout = this.saveLayout.bind(this);
  }

  handleChangeScreenSize(event, data) {
    this.setState({ currentScreenSize: data.value }, () =>
      this.props.dispatchToParent('CHANGE_SCREEN_SIZE', data.value),
    );
  }

  handlePreviewResponsive(event, data) {
    console.log('handle preview responsive', event, data);
    this.props.dispatchToParent('PREVIEW_RESPONSIVE', data.checked);
  }

  deleteLayout() {
    this.props.dispatchToParent('DELETE_LAYOUT', this.state.currentScreenSize);
  }
  saveLayout() {
    this.props.dispatchToParent('CREATE_LAYOUT', this.state.currentScreenSize);
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
            <Radio toggle onChange={this.handlePreviewResponsive} />
            <span>Preview responsive layout</span>
          </Grid.Column>

          <Grid.Column>
            <span>Select screen size</span>
            <Dropdown
              inline
              onChange={this.handleChangeScreenSize}
              options={this.props.availableScreens}
              selection
              value={this.state.currentScreenSize}
            />
          </Grid.Column>
          <Grid.Column>
            {showSaveButton ? (
              <Button onClick={this.saveLayout}>Save responsive layout</Button>
            ) : (
              ''
            )}
            {showDeleteButton ? (
              <Button onClick={this.deleteLayout}>
                Delete responsive layout
              </Button>
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
