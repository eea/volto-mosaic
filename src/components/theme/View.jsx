import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { breakpoints, rowHeight } from '../../constants';
import React, { Component } from 'react';
import { blocks } from '~/config'; // settings,
import { BodyClass } from '@plone/volto/helpers';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import { Helmet } from '@plone/volto/helpers';

import { getOverridenBlocks } from 'volto-mosaic/helpers';

import _ from 'lodash';
import sizeMe, { SizeMe } from 'react-sizeme';
import RGL from 'react-grid-layout';
import { setMosaicWidth } from 'volto-mosaic/actions';

// Needed for SSR, see See https://github.com/ctrlplusb/react-sizeme
sizeMe.noPlaceholders = true;

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
    const { formData, blockid, className } = this.props;

    const blocksFieldname = getBlocksFieldname(formData);

    if (!formData[blocksFieldname]) {
      return <div>The content for this mosaic view is not blocks-enabled</div>;
    }
    const blockData = formData[blocksFieldname][blockid];
    // console.log(
    //   'formdata',
    //   formData,
    //   'blocksfieldname',
    //   blocksFieldname,
    //   'blockid',
    //   blockid,
    // );
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
    let klass = 'block-wrapper ' + style + ' ' + className;

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
    // console.debug('mosaic-debug get height', height, node);
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
  };

  constructor(props) {
    super(props);

    const hasClonedBehaviour = props.content.layout === 'cloned_blocks_view';
    // const content = props.content;

    const overridenBlocks = hasClonedBehaviour
      ? getOverridenBlocks(props.content.blocks)
      : {};

    let blocks = props.content.blocks;
    if (
      hasClonedBehaviour &&
      props.content.blocks_layout?.overrideLayout === true
    ) {
      blocks = {
        ...props.content.blocks,
        ...props.content.cloned_blocks,
        ...overridenBlocks,
      };
    }
    if (hasClonedBehaviour && !props.content.blocks_layout?.overrideLayout) {
      blocks = { ...props.content.cloned_blocks, ...overridenBlocks };
    }

    let blocks_layout = JSON.parse(JSON.stringify(props.content.blocks_layout));
    if (
      hasClonedBehaviour &&
      props.content.blocks_layout?.overrideLayout === true
    ) {
      if (props.content.blocks_layout?.items?.length === 0) {
        blocks_layout = JSON.parse(
          JSON.stringify(props.content.cloned_blocks_layout),
        );
      }
    }
    if (hasClonedBehaviour && !props.content.blocks_layout?.overrideLayout) {
      blocks_layout = JSON.parse(
        JSON.stringify(props.content.cloned_blocks_layout),
      );
    }

    const content = hasClonedBehaviour
      ? {
          ...props.content,
          blocks_layout,
          blocks: {
            ...blocks,
            ...overridenBlocks,
          },
        }
      : props.content;

    const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
    const propsLayout = content[blocksLayoutFieldname];
    var layout = JSON.parse(JSON.stringify(propsLayout));
    this.timeout = null;
    this.state = {
      mosaic_layout: (layout && layout.mosaic_layout) || {},
      items: (layout && layout.items) || {},
      activeMosaicLayout: 'lg',
      containerWidth: null,
      blurred: true,
      content,
    };

    this.onBlockShowUpdate = this.onBlockShowUpdate.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onWidthChange = this.onWidthChange.bind(this);
  }

  componentDidMount() {
    if (
      __CLIENT__ &&
      1920 - parseInt(document.querySelector('main').offsetWidth) > 280
    ) {
      this.timeout = setTimeout(() => this.resetLayout(), 200);
      console.log('adding timeout', this.timeout);
    } else {
      this.setState({ blurred: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.content['@id'] !== this.props.content['@id']) {
      this.resetLayout();
    }
  }

  componentWillUnmount = () => {
    if (this.timeout) {
      console.log('clearing timout');
      clearTimeout(this.timeout);
    }
    clearTimeout(this.timeout);
  };

  onBlockShowUpdate(blockid, height) {
    const size = this.state.activeMosaicLayout;

    const content = this.state.content;
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
    return (
      this.state.mosaic_layout['lg'] &&
      this.state.mosaic_layout['lg'].map((item, i) => {
        const content = this.state.content;
        const blocksFieldName = getBlocksFieldname(content);
        const blocksField = content[blocksFieldName];
        return (
          <div key={`${item.i}`}>
            <BlockViewWrapper
              style={{ maxWidth: '100%' }}
              blockid={item.i}
              formData={this.state.content}
              className={`type-${blocksField[item.i]?.['@type']}`}
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
  resetLayout = () => {
    const hasClonedBehaviour =
      this.props.content.layout === 'cloned_blocks_view';
    // const content = props.content;

    const overridenBlocks = hasClonedBehaviour
      ? getOverridenBlocks(this.props.content.blocks)
      : {};

    let blocks = this.props.content.blocks;
    if (
      hasClonedBehaviour &&
      this.props.content.blocks_layout?.overrideLayout === true
    ) {
      blocks = {
        ...this.props.content.blocks,
        ...this.props.content.cloned_blocks,
        ...overridenBlocks,
      };
    }
    if (
      hasClonedBehaviour &&
      !this.props.content.blocks_layout?.overrideLayout
    ) {
      blocks = { ...this.props.content.cloned_blocks, ...overridenBlocks };
    }

    let blocks_layout = JSON.parse(
      JSON.stringify(this.props.content.blocks_layout),
    );
    if (
      hasClonedBehaviour &&
      this.props.content.blocks_layout?.overrideLayout === true
    ) {
      if (this.props.content.blocks_layout?.items?.length === 0) {
        blocks_layout = JSON.parse(
          JSON.stringify(this.props.content.cloned_blocks_layout),
        );
      }
    }
    if (
      hasClonedBehaviour &&
      !this.props.content.blocks_layout?.overrideLayout
    ) {
      blocks_layout = JSON.parse(
        JSON.stringify(this.props.content.cloned_blocks_layout),
      );
    }

    const content = hasClonedBehaviour
      ? {
          ...this.props.content,
          blocks_layout,
          blocks: {
            ...blocks,
            ...overridenBlocks,
          },
        }
      : this.props.content;

    this.setState({ content }, () => {
      const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
      const propsLayout = content[blocksLayoutFieldname];
      let layout = JSON.parse(JSON.stringify(propsLayout));
      let mosaic_layout, items;
      if (layout.items.toString() !== this.state.items.toString()) {
        mosaic_layout = (layout && layout.mosaic_layout) || {};
        items = (layout && layout.items) || {};
        this.setState({ items, mosaic_layout: {} }, () =>
          this.setState({ mosaic_layout }, this.setState({ blurred: false })),
        );
      } else {
        mosaic_layout = JSON.parse(JSON.stringify(this.state.mosaic_layout));
        this.setState({ mosaic_layout: {} }, () =>
          this.setState({ mosaic_layout }, this.setState({ blurred: false })),
        );
      }
    });
  };

  render() {
    // console.debug('mosaic-debug props', this.props);

    const { content } = this.state;
    // const blocksFieldname = getBlocksFieldname(content);
    // const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
    // const marginsData =
    //   content?.[blocksLayoutFieldname]?.margins &&
    //   parseInt(content?.[blocksLayoutFieldname]?.margins);
    // const margins = marginsData ? [marginsData, marginsData] : [0, 0];
    // console.debug('mosaic-debug margins', margins);
    // TODO: I'm not sure why the 4*margin adjustment is needed. Should test
    // and come up with an explanation
    //
    // There seems to be different DOM output between the mosaic view and the
    // cloned blocks view. To be investigated!
    // Math.max(
    // ) -
    // 4 * margins[0]
    // return (<div>asd{JSON.stringify(this.props.mosaic_layout)}</div>)

    return this.state.mosaic_layout ? (
      <div className="mosaic_view">
        <Helmet title={content.title} />
        <BodyClass className="mosaic-view" />
        <SizeMe>
          {({ size }) => {
            // console.debug('got SizeMe size', size);
            // console.log(
            //   '----------->',
            //   breakpoints(size.width),
            //   this.state.mosaic_layout,
            // );
            return (
              <ReactGridLayout
                layouts={this.state.mosaic_layout}
                breakpoints={breakpoints(size.width)}
                useCSSTransforms={__SERVER__ ? true : false}
                cols={{
                  lg: 12,
                  md: this.state.mosaic_layout.md ? 12 : 12, // 9 - is this a good default?
                  sm: this.state.mosaic_layout.sm ? 12 : 12, // 4
                  xs: this.state.mosaic_layout.xs ? 12 : 12, // 2
                  xxs: this.state.mosaic_layout.xxs ? 12 : 12, //1
                }}
                onBreakpointChange={this.onBreakpointChange}
                onWidthChange={this.onWidthChange}
                measureBeforeMount={true}
                rowHeight={rowHeight}
                margin={[0, 0]}
                isDraggable={false}
                isResizable={false}
                isDroppable={false}
                width={(() => {
                  this.props.setMosaicWidth(
                    size.width ||
                      (__CLIENT__ &&
                        document.querySelector('main').offsetWidth),
                  );
                  return (
                    size.width ||
                    ((__CLIENT__ &&
                      document.querySelector('main').offsetWidth) ||
                      1920)
                  );
                })()}
                className={`${
                  this.state.blurred
                    ? 'blurr-transition blurred'
                    : 'blur-transition'
                }`}
              >
                {this.renderBlocks()}
              </ReactGridLayout>
            );
          }}
        </SizeMe>
      </div>
    ) : (
      ''
    );
  }
}

// export default View;
export default connect(
  (state, props) => ({
    content:
      state.prefetch?.[state.router.location.pathname] || state.content.data,
    pathname: state.router.location.pathname, //props.location.pathname,
  }),
  { setMosaicWidth },
)(MosaicView);
