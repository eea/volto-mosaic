import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
// import _ from 'lodash';
// import { omit, without } from 'lodash';

import { reject } from 'volto-mosaic/helpers';

const onRemoveItem = ({ id, formData, activeMosaicLayout }) => {
  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  console.log('formData', formData, blocksLayoutFieldname)
  const layoutField = formData[blocksLayoutFieldname];
  const mosaic_layout = layoutField.mosaic_layout || {};

  const activeMosaicLayoutWithoutCurrentItem = activeMosaicLayout.filter(
    item => item.i !== id,
  );
  // _.reject(activeMosaicLayout, {
  //   i: id,
  // });

  // mosaic_layout[this.state.activeScreenSize] = activeMosaicLayout;
  Object.keys(mosaic_layout).forEach(k => {
    mosaic_layout[k] = mosaic_layout[k].filter(item => item.i !== id);
    // _.reject(mosaic_layout[k], { i: id });
  });

  return {
    activeMosaicLayout: activeMosaicLayoutWithoutCurrentItem,
    formData: {
      ...formData,
      [blocksLayoutFieldname]: {
        ...formData[blocksLayoutFieldname],
        items: layoutField.items.filter(item => item !== id),
        // without(layoutField.items, id),
        mosaic_layout, // TODO: might need JSON.stringify?
      },
      [blocksFieldname]: reject(formData[blocksFieldname], [id]),
    },
  };
};
export default onRemoveItem;
