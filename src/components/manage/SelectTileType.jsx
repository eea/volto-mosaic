// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { tiles } from '~/config';

import { Label, Dropdown } from 'semantic-ui-react';

class SelectTileType extends Component {
  // static propTypes = {
  //   onMutateTile: PropTypes.func,
  //   tile: PropTypes.string,
  // };

  constructor(props) {
    super(props);
    let availableTiles = {
      ...tiles.tilesConfig,
    };

    const selectTiles = Object.values(availableTiles).map(t => ({
      key: t.title,
      value: t.title,
      text: t.title,
    }));

    this.state = {
      selectTiles,
    };
  }

  render() {
    return (
      <Dropdown
        button
        text="Change tile type"
        labeled
        floating
        search
        options={this.state.selectTiles}
        className={'tile-selector'}
        onChange={(event, data) => this.props.onMutateTile(data.value)}
        defaultValue={this.props.tile['@type']}
      />
    );
  }
}

export default SelectTileType;
