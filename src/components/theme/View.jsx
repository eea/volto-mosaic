import ReactDOM from 'react-dom';
import { breakpoints, rowHeight } from '../../config';
import React, { Component } from 'react';
import { Responsive } from 'react-grid-layout';
// import WidthProvider from './WidthProvider';
import { blocks } from '~/config'; // settings,
import { SizeMe } from 'react-sizeme';
import _ from 'lodash';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  // hasBlocksData,
} from '@plone/volto/helpers';

const ReactGridLayout = Responsive;

export class TileViewWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updated: false,
      ref: props.useref || React.createRef(),
    };

    this.getHeight = this.getHeight.bind(this);
  }

  render() {
    const formData = this.props.formData;
    const tileid = this.props.tileid;

    const tilesFieldname = getBlocksFieldname(formData);
    const blockData = formData[tilesFieldname][tileid];
    if (!blockData) {
      console.log('no tile data for tileid', tileid, formData[tilesFieldname]);
      return '';
    }
    const tiletype = blockData['@type'].toLowerCase();

    if (!blocks.tilesConfig[tiletype]) {
      console.log('Tile configuration not found', tiletype);
      return '';
    }

    let Tile = null;
    Tile = blocks.tilesConfig[tiletype].view;

    let style = blockData.mosaic_box_style || 'default-tile';
    let klass = 'tile-wrapper ' + style;

    return Tile !== null ? (
      <div className="tile-container" ref={this.state.ref}>
        <div className={klass}>
          {blockData.tile_title && blockData.show_tile_title && (
            <h5 className="title-title">{blockData.tile_title}</h5>
          )}
          <Tile key={tileid} properties={formData} data={blockData} />
        </div>
      </div>
    ) : (
      <div> {JSON.stringify(tiletype)} </div>
    );
  }

  getHeight() {
    const node = ReactDOM.findDOMNode(this.state.ref.current);
    let child = node && node.querySelector('.tile-wrapper > *');
    // console.log('get height', node);
    let height = (child && child.scrollHeight) || (node && node.scrollHeight);
    // TODO: this is a hack. Need to make sure that this is correct;
    // The problem is that tile-wrapper and its parrent tile-container are all
    // 100% height. There is a conflict between need for static layout but also
    // update dynamically, so we need to be a lot smarter and there will be
    // a lot of edge cases that we can't avoid.
    return height && height + 20; // also add paddings from tile-wrapper
  }

  componentDidMount() {
    if (!this.props.showUpdate) return; // might not need this on View

    this.setState({ updated: false }, () => {
      const height = this.getHeight();
      // console.log('componentDidMount', this.props.tileid, height);
      this.props.showUpdate(this.props.tileid, height);
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.showUpdate) return; // don't need this on View

    // need this to avoid infinite recursion
    if (
      prevProps.containerWidth === this.props.containerWidth &&
      this.state.updated
    )
      return;

    this.setState({ updated: true }, () => {
      const height = this.getHeight();
      // console.log('componentDidUpdate default code', this.props.tileid, height);
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
    const tilesLayoutFieldname = getBlocksLayoutFieldname(content);
    const layout = content[tilesLayoutFieldname];
    console.log('received layout', layout);

    if (!__SERVER__) {
      this.state = {
        mosaic_layout: (layout && layout.mosaic_layout) || {},
        items: (layout && layout.items) || {},
        activeMosaicLayout: 'lg',
        containerWidth: null,
      };
    } else {
      this.state = {};
    }

    this.onTileShowUpdate = this.onTileShowUpdate.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onWidthChange = this.onWidthChange.bind(this);
  }

  onTileShowUpdate(tileid, height) {
    const size = this.state.activeMosaicLayout;

    const content = this.props.content;
    const tilesLayoutFieldname = getBlocksLayoutFieldname(content);
    const fullLayout = content[tilesLayoutFieldname];

    let layout =
      fullLayout.mosaic_layout &&
      (fullLayout.mosaic_layout[size] || fullLayout.mosaic_layout['lg']);
    if (!layout) return;
    let tile = layout.find(t => t.i === tileid);
    // let oldH = tile.h;
    let h = Math.ceil(height / rowHeight);

    this.setState((state, props) => {
      let newState = {
        ...state,
        mosaic_layout: {
          ...fullLayout.mosaic_layout,
          [size]: [{ ...tile, h }, ..._.without(layout, tile)],
        },
      };
      // console.log('new state', oldH, h, newState);

      return newState;
    });
  }

  renderTiles() {
    // console.log('render blocks');
    return (
      this.state.mosaic_layout['lg'] &&
      this.state.mosaic_layout['lg'].map((item, i) => {
        return (
          <div key={item.i}>
            <TileViewWrapper
              tileid={item.i}
              formData={this.props.content}
              showUpdate={this.onTileShowUpdate}
              containerWidth={this.state.containerWidth}
            />
          </div>
        );
      })
    );
  }

  onBreakpointChange(bk, cols) {
    console.log('New breakpoint', bk, cols, this.state.containerWidth);
    this.setState({
      activeMosaicLayout: bk,
    });
  }

  onWidthChange(containerWidth, margin, cols, containerPadding) {
    // (containerWidth: number,
    //   margin: [number, number],
    //   cols: number,
    //   containerPadding: [number, number])
    // console.log(
    //   'On width change',
    //   containerWidth,
    //   margin,
    //   cols,
    //   containerPadding,
    // );
    let width = Math.floor(containerWidth);
    if (Math.abs(width - this.state.containerWidth) > 6) {
      console.log('new width', width);
      this.setState({
        containerWidth: width,
      });
    }
  }

  render() {
    console.log(this.state.mosaic_layout);
    return this.state.mosaic_layout ? (
      <div className="mosaic_view">
        <SizeMe>
          {({ size }) => (
            <ReactGridLayout
              layouts={this.state.mosaic_layout}
              breakpoints={breakpoints}
              cols={{
                lg: 12,
                md: this.state.mosaic_layout.md ? 12 : 9, // is this a good default?
                sm: this.state.mosaic_layout.sm ? 12 : 4,
                xs: this.state.mosaic_layout.xs ? 12 : 2,
                xxs: this.state.mosaic_layout.xxs ? 12 : 1,
              }}
              onBreakpointChange={this.onBreakpointChange}
              onWidthChange={this.onWidthChange}
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
