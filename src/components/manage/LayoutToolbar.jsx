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
  }

  handleChangeScreenSize(event, data) {
    this.setState({ currentScreenSize: data.value }, () =>
      this.props.dispatchToParent('CHANGE_SCREEN_SIZE', data.value),
    );
  }

  handlePreviewResponsive(event, data) {
    console.log('handle', event, data);
    this.props.dispatchToParent('PREVIEW_RESPONSIVE', data.checked);
  }

  render() {
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
            <Button>Add (Remove) layout</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default LayoutToolbar;
