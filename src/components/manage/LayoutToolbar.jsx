import React, { Component } from 'react';
import { screenSizes } from '../../config';
import { Dropdown } from 'semantic-ui-react';
// import _ from 'lodash';
//
const screens = Object.keys(screenSizes).map(k => {
  return { key: k, text: screenSizes[k], value: k };
});

class LayoutToolbar extends Component {
  static defaultProps = {
    screens,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentScreenSize: 'lg',
    };

    this.onChangeScreenSize = this.onChangeScreenSize.bind(this);
  }

  onChangeScreenSize(event, data) {
    this.setState({ currentScreenSize: data.value }, () =>
      this.props.dispatchToParent('CHANGE_SCREEN_SIZE', data.value),
    );
  }

  render() {
    return (
      <Dropdown
        placeholder="Select screen size"
        selection
        options={this.props.screens}
        value={this.state.currentScreenSize}
        onChange={this.onChangeScreenSize}
      />
    );
  }
}

export default LayoutToolbar;
