import PropTypes from 'prop-types';
import React, { Component } from "react";

class AddNewTile extends Component {
    static propTypes = {
      onMutateTile: PropTypes.func,
      tile: PropTypes.string,
    };
  
    constructor(props) {
      super(props);
      console.log('aici', tiles)
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
        <div className="ui form add-tile toolbar">
  
          <label>Tile type:</label>
          <Select
            className={"tile-selector"}
            onChange={(event, data) =>
              this.props.onMutateTile(this.props.tile, {
                '@type': data.value,
              })
            }
            defaultValue={this.props.tiles[this.props.tile]['@type']}
            placeholder="Change tile type"
            options={this.state.selectTiles}
            />
        </div>
      );
    }
  }
  
  export default AddNewTile