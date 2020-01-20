import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { breakpoints, rowHeight } from '../../constants';
import React, { Component } from 'react';
import { settings, blocks } from '~/config'; // settings,

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  // hasBlocksData,
} from '@plone/volto/helpers';
import _ from 'lodash';
import { SizeMe } from 'react-sizeme';
import RGL from 'react-grid-layout';
import { getLocation, samePath } from 'volto-mosaic/helpers';
import Spinner from './Spinner';

const { Responsive } = RGL;

const ReactGridLayout = Responsive;

export class BlockViewWrapper extends Component {
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
    const blockid = this.props.blockid;

    const blocksFieldname = getBlocksFieldname(formData);
    if (!formData[blocksFieldname]) {
      return <div>The content for this mosaic view is not blocks-enabled</div>;
    }
    const blockData = formData[blocksFieldname][blockid];
    if (!blockData) {
      console.warn(
        'no block data for blockid',
        blockid,
        formData[blocksFieldname],
      );
      return '';
    }
    const blocktype = blockData['@type'].toLowerCase();

    if (!blocks.blocksConfig[blocktype]) {
      console.warn('Block configuration not found', blocktype);
      return '';
    }

    let Block = null;
    Block = blocks.blocksConfig[blocktype].view;

    let style = blockData.mosaic_box_style || 'default-block';
    let klass = 'block-wrapper ' + style;

    return Block !== null ? (
      <div className="block-container" ref={this.state.ref}>
        <div className={klass}>
          {blockData.block_title && blockData.show_block_title && (
            <h5 className="title-title">{blockData.block_title}</h5>
          )}
          <Block key={blockid} properties={formData} data={blockData} />
        </div>
      </div>
    ) : (
      <div> {JSON.stringify(blocktype)} </div>
    );
  }

  getHeight() {
    const node = ReactDOM.findDOMNode(this.state.ref.current);
    let child = node && node.querySelector('.block-wrapper > *');
    let height = (child && child.scrollHeight) || (node && node.scrollHeight);
    // TODO: this is a hack. Need to make sure that this is correct;
    // The problem is that block-wrapper and its parrent block-container are all
    // 100% height. There is a conflict between need for static layout but also
    // update dynamically, so we need to be a lot smarter and there will be
    // a lot of edge cases that we can't avoid.
    console.log('get height', height, node);
    return height && height - 20; //&& height + 20;
    // const heightFromMargin = +this.props.formData?.blocks_layout?.margins
    //   ? 2 * parseInt(this.props.formData.blocks_layout.margins)
    //   : 0;
    // const res = height && height + 10 - heightFromMargin; // also add paddings from block-wrapper
    // console.log('height', height, heightFromMargin, res);
    // return res;
  }

  componentDidMount() {
    if (!this.props.showUpdate) return; // might not need this on View

    this.setState({ updated: false }, () => {
      const height = this.getHeight();
      // console.log('componentDidMount', this.props.blockid, height);
      this.props.showUpdate(this.props.blockid, height);
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
      // const height = this.getHeight();
      // console.log('componentDidUpdate default code', this.props.blockid, height);
      // this.props.showUpdate(this.props.blockid, height);
    });
  }
}

class MosaicView extends Component {
  static defaultProps = {
    cols: 12,
    margin: [0, 0],
    onLayoutChange: function() {},
  };

  constructor(props) {
    super(props);

    const content = props.content;
    const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
    const layout = content[blocksLayoutFieldname];
    // console.log('received layout', layout);

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

    this.onBlockShowUpdate = this.onBlockShowUpdate.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onWidthChange = this.onWidthChange.bind(this);
  }

  onBlockShowUpdate(blockid, height) {
    const size = this.state.activeMosaicLayout;

    const content = this.props.content;
    const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
    const fullLayout = content[blocksLayoutFieldname];

    let layout =
      fullLayout.mosaic_layout &&
      (fullLayout.mosaic_layout[size] || fullLayout.mosaic_layout['lg']);
    if (!layout) return;
    let block = layout.find(t => t.i === blockid);
    // let oldH = block.h;
    let h = Math.ceil(height / rowHeight);

    this.setState((state, props) => {
      let newState = {
        ...state,
        mosaic_layout: {
          ...fullLayout.mosaic_layout,
          [size]: [{ ...block, h }, ..._.without(layout, block)],
        },
      };
      // console.log('new state', oldH, h, newState);

      return newState;
    });
  }

  renderBlocks() {
    // console.log('render blocks');
    return (
      this.state.mosaic_layout['lg'] &&
      this.state.mosaic_layout['lg'].map((item, i) => {
        return (
          <div key={item.i}>
            <BlockViewWrapper
              blockid={item.i}
              formData={this.props.content}
              // showUpdate={this.onBlockShowUpdate}
              containerWidth={this.state.containerWidth}
            />
          </div>
        );
      })
    );
  }

  onBreakpointChange(bk, cols) {
    // console.log('New breakpoint', bk, cols, this.state.containerWidth);
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
      // console.log('new width', width);
      this.setState({
        containerWidth: width,
      });
    }
  }

  render() {
    const currentUrl = this.props.content?.['@id'];
    const shouldRenderRoutes =
      typeof currentUrl !== 'undefined' &&
      samePath(currentUrl, this.props.pathname)
        ? true
        : false;
    // console.log(
    //   'should',
    //   shouldRenderRoutes,
    //   this.props.pathname,
    //   this.props.contentId,
    // );

    if (!shouldRenderRoutes) return <Spinner />;

    // console.log('the config', configJs);
    console.log('lalalala', 'props', this.props);
    const marginsData =
      this.props.content?.blocks_layout?.margins &&
      parseInt(this.props.content?.blocks_layout?.margins);
    const margins = marginsData ? [marginsData, marginsData] : [0, 0];
    console.log('MARGINS', margins);
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
              // margin={[0, 0]}
              margin={margins}
              isDraggable={false}
              isResizable={false}
              isDroppable={false}
              width={size.width || document.querySelector('main').offsetWidth}
            >
              {this.renderBlocks()}
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

// export default View;
export default connect((state, props) => ({
  pathname: state.router.location.pathname, //props.location.pathname,
}))(MosaicView);
