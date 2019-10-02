import { breakpoints, rowHeight } from '../../config';
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

export function renderTile(formData, tileid) {
  // const content = this.props.content;
  const tilesFieldname = getTilesFieldname(formData);
  const availableTiles = formData[tilesFieldname];
  const tiletype = availableTiles[tileid]['@type'].toLowerCase();

  // console.log('Rendering tile:', tileid, tiletype, tilesFieldname, formData);

  let Tile = null;
  Tile = tiles.tilesConfig[tiletype].view;

  let style = formData[tilesFieldname][tileid].mosaicBoxStyle || 'default-tile';
  let klass = 'tile-container ' + style;

  return Tile !== null ? (
    <div className={klass}>
      <Tile key={tileid} properties={formData} data={availableTiles[tileid]} />
    </div>
  ) : (
    <div> {JSON.stringify(tiletype)} </div>
  );
}

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
    // console.log('content', content);
    const tilesLayoutFieldname = getTilesLayoutFieldname(content);
    const layout = content[tilesLayoutFieldname];

    if (!__SERVER__) {
      this.state = {
        mosaic_layout: layout.mosaic_layout,
        items: layout.items,
      };
    }

    // console.log('This.state in constructor', this.state, content);
  }

  renderTiles() {
    // console.log('Render tiles', this.state.mosaic_layout);
    // TODO: need to take all tiles into consideration
    return this.state.mosaic_layout['lg'].map((item, i) => {
      // console.log('item', item);
      return <div key={item.i}>{renderTile(this.props.content, item.i)}</div>;
    });
  }

  onLayoutChange(layout) {
    // console.log('changing lauyout');
    // this.props.onLayoutChange(layout);
  }

  render() {
    return this.state.mosaic_layout ? (
      <SizeMe>
        {({ size }) => (
          <ReactGridLayout
            layouts={this.state.mosaic_layout}
            breakpoints={breakpoints}
            cols={{
              lg: 12, 
              md: this.state.mosaic_layout.md ? 12 : 10, 
              sm: this.state.mosaic_layout.sm ? 12 : 8, 
              xs:this.state.mosaic_layout.xs ? 12 : 2, 
              xxs:this.state.mosaic_layout.xxs ? 12 : 2 
            }}
            measureBeforeMount={true}
            rowHeight={rowHeight}
            margin={[0, 0]}
            isDraggable={false}
            isResizable={false}
            isDroppable={false}
            width={size.width || document.querySelector('main').offsetWidth}
          >
            {this.renderTiles()}
          </ReactGridLayout>
        )}
      </SizeMe>
    ) : (
      ''
    );
  }
}

export default View;
