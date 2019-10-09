// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { tiles } from '~/config';
import { Dropdown } from 'semantic-ui-react';

class SelectTileType extends Component {
  render() {
    const selectTiles = Object.keys(tiles.tilesConfig).map((k, i) => {
      return {
        key: `${k}-${i}`,
        value: k,
        text: tiles.tilesConfig[k].title,
      };
    });

    return (
      <Dropdown
        button
        labeled
        options={selectTiles}
        className={'tile-selector'}
        onChange={(event, data) => this.props.onMutateTile(data.value)}
        value={this.props.tile['@type'].toLowerCase()}
      />
    );
  }
}

export default SelectTileType;
