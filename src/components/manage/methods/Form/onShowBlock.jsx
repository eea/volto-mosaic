import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import _ from 'lodash';

const onShowBlock = ({
  formData,
  blockid,
  activeMosaicLayout,
  activeScreenSize,
  height,
}) => {
  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const layoutField = formData[blocksLayoutFieldname];
  if (!activeScreenSize) {
    activeScreenSize = 'lg';
  }
  const blockData = formData[blocksFieldname][blockid];

  const sizing = blockData.mosaic_box_sizing || 'manual';

  let ix, lh;
  switch (sizing) {
    case 'fit-content':
      const activeMosaicLayoutCopy = JSON.parse(
        JSON.stringify(activeMosaicLayout),
      );
      lh = Math.ceil(height / this.props.rowHeight);
      ix = activeMosaicLayoutCopy.indexOf(
        activeMosaicLayoutCopy.find(el => {
          return el.i === blockid;
        }),
      );
      activeMosaicLayoutCopy[ix].h = lh;
      return {
        formData: {
          ...formData,
          [blocksLayoutFieldname]: {
            ...layoutField,
            mosaic_layout: {
              ...layoutField.mosaic_layout,
              [activeScreenSize]: activeMosaicLayoutCopy,
            },
          },
        },
        activeMosaicLayoutCopy,
      };
    // case 'min-height':
    //   // TODO: get minimum block height from settings, trigger layout update
    //   const type = formData['@type'].toLowerCase();
    //   const minHeight = blocks.blocksConfig[type].height || 100;
    //   height = Math.ceil(minHeight / this.props.rowHeight);
    //   ix = activeMosaicLayout.indexOf(
    //     activeMosaicLayout.find(el => {
    //       return el.i === blockid;
    //     }),
    //   );
    //   activeMosaicLayout[ix].h = height;
    //   break;
    case 'fill-space':
      break;
    case 'manual':
      break;
    default:
      break;
  }
};

export default onShowBlock;
