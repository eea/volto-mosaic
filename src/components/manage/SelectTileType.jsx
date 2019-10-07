// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { tiles } from '~/config';

import { Dropdown } from 'semantic-ui-react';

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

    const selectTiles = Object.values(availableTiles).map((t, i) => ({
      key: `${t.title.toLowerCase()}-${i}`,
      value: t.title.toLowerCase(),
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
        labeled
        options={this.state.selectTiles}
        className={'tile-selector'}
        onChange={(event, data) => this.props.onMutateTile(data.value)}
        value={this.props.tile['@type'].toLowerCase()}
      />
    );
  }
}

export default SelectTileType;
