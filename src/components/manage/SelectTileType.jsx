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

    const selectTiles = Object.values(availableTiles).map(t => ({
      key: t.title.toLowerCase(),
      value: t.title.toLowerCase(),
      text: t.title,
    }));

    this.state = {
      selectTiles,
    };
    // console.log('selector selecTiles', selectTiles);
    // console.log('selector props', props);
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
