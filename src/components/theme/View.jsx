import React, { Component } from 'react';
import { Responsive } from 'react-grid-layout';
// import WidthProvider from './WidthProvider';
import { tiles } from '~/config'; // settings,
import { SizeMe } from 'react-sizeme';

import {
  getTilesFieldname,
  getTilesLayoutFieldname,
  // hasTilesData,
} from '@plone/volto/helpers';

const ReactGridLayout = Responsive;

class View extends Component {
  static defaultProps = {
    className: 'layout',
    isDraggable: false,
    isResizable: false,
    items: 50,
    cols: 12,
    rowHeight: 30,
    margin: [0, 0],
    onLayoutChange: function() {},
  };

  constructor(props) {
    super(props);

    // const layout = this.generateLayout();
    // this.state = { layout };

    let content = props.content;
    console.log('content', content);
    const tilesLayoutFieldname = getTilesLayoutFieldname(content);
    const layout = content[tilesLayoutFieldname];

    if (!__SERVER__) {
      this.state = {
        mosaic_layout: layout.mosaic_layout,
        items: layout.items,
      };
    }

    console.log('This.state in constructor', this.state, content);
  }

  renderTiles() {
    console.log('Render tiles', this.state.mosaic_layout);
    return this.state.mosaic_layout.map((item, i) => {
      console.log('item', item);
      return <div key={item.i}>{this.renderTile(item.i)}</div>;
    });
  }

  renderTile(tileid) {
    const content = this.props.content;
    const tilesFieldname = getTilesFieldname(content);
    const availableTiles = content[tilesFieldname];
    const tiletype = availableTiles[tileid]['@type'].toLowerCase();

    console.log('Rendering tile:', tileid, tiletype, tilesFieldname, content);

    let Tile = null;
    Tile = tiles.tilesConfig[tiletype].view;

    return Tile !== null ? (
      <div class="tile-container">
        <Tile key={tileid} properties={content} data={availableTiles[tileid]} />
      </div>
    ) : (
      <div> {JSON.stringify(tiletype)} </div>
    );
  }

  onLayoutChange(layout) {
    console.log('chaging lauyout');
    // this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <SizeMe>
        {({ size }) => (
          <ReactGridLayout
            layout={this.state.mosaic_layout}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 12, sm: 6, xs: 2, xxs: 2 }}
            measureBeforeMount={true}
            rowHeight={30}
            margin={[0, 0]}
            isDraggable={false}
            isResizable={false}
            isDroppable={false}
            layouts={{
              lg: this.state.mosaic_layout,
              md: this.state.mosaic_layout,
              sm: this.state.mosaic_layout,
              xs: this.state.mosaic_layout,
              xxs: this.state.mosaic_layout,
            }}
            width={size.width || document.querySelector('main').offsetWidth}
          >
            {this.renderTiles()}
          </ReactGridLayout>
        )}
      </SizeMe>
    );
  }
}

export default View;
