import ReactDOM from 'react-dom';
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

export class TileViewWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      // ref: React.createRef(),
    };

    this.getHeight = this.getHeight.bind(this);
  }

  render() {
    console.log('rendering tile');
    const formData = this.props.formData;
    const tileid = this.props.tileid;

    // const content = this.props.content;
    const tilesFieldname = getTilesFieldname(formData);
    const availableTiles = formData[tilesFieldname];
    const tiletype = availableTiles[tileid]['@type'].toLowerCase();

    let Tile = null;
    Tile = tiles.tilesConfig[tiletype].view;
    const tileData = formData[tilesFieldname][tileid];

    let style = tileData.mosaic_box_style || 'default-tile';
    let klass = 'tile-wrapper ' + style;

    return Tile !== null ? (
      <div className="tile-container" ref={this.props.useref}>
        <div className={klass}>
          {tileData.tile_title && tileData.show_tile_title && (
            <h5 className="title-title">{tileData.tile_title}</h5>
          )}
          <Tile
            key={tileid}
            properties={formData}
            data={availableTiles[tileid]}
          />
        </div>
      </div>
    ) : (
      <div> {JSON.stringify(tiletype)} </div>
    );
  }

  getHeight() {
    const node = ReactDOM.findDOMNode(this.props.useref.current);
    // console.log('getheight', node);
    return node.scrollHeight;
  }

  componentDidMount() {
    if (!this.props.showUpdate) return; // don't need this on View

    this.setState({ updated: false }, () => {
      const height = this.getHeight();
      console.log('componentDidMount', this.props.tileid, height);
      this.props.showUpdate(this.props.tileid, height);
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.showUpdate) return; // don't need this on View

    if (this.state.updated) return;

    this.setState({ updated: true }, () => {
      const height = this.getHeight();
      console.log('componentDidUpdate default code', this.props.tileid, height);
      this.props.showUpdate(this.props.tileid, height);
    });
  }
}

class View extends Component {
  static defaultProps = {
    cols: 12,
    margin: [0, 0],
    onLayoutChange: function() {},
  };

  constructor(props) {
    super(props);

    const content = props.content;
    const tilesLayoutFieldname = getTilesLayoutFieldname(content);
    const layout = content[tilesLayoutFieldname];

    if (!__SERVER__) {
      this.state = {
        mosaic_layout: layout.mosaic_layout,
        items: layout.items,
      };
    }
  }

  renderTiles() {
    console.log('render tiles');
    return this.state.mosaic_layout['lg'].map((item, i) => {
      return (
        <div key={item.i}>
          <TileViewWrapper tileid={item.i} formData={this.props.content} />
        </div>
      );
    });
  }

  render() {
    console.log('breakpoints', breakpoints);
    console.log('layouts', this.state.mosaic_layout);

    return this.state.mosaic_layout ? (
      <div>
        <SizeMe>
          {({ size }) => (
            <ReactGridLayout
              layouts={this.state.mosaic_layout}
              breakpoints={breakpoints}
              cols={{
                lg: 12,
                md: this.state.mosaic_layout.md ? 12 : 12, // is this a good default?
                sm: this.state.mosaic_layout.sm ? 12 : 12,
                xs: this.state.mosaic_layout.xs ? 2 : 12,
                xxs: this.state.mosaic_layout.xxs ? 1 : 12,
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
        {this.state.mosaic_layout.mosaic_css_override && (
          <style
            dangerouslySetInnerHTML={{
              __html: this.state.mosaic_layout.mosaic_css_override,
            }}
          />
        )}
      </div>
    ) : (
      ''
    );
  }
}

export default View;
