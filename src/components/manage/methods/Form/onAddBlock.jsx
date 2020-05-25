import React from 'react';
import { v4 as uuid } from 'uuid';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import _ from 'lodash';

const onAddBlock = ({
  type,
  formData,
  refs,
  activeScreenSize,
  use_grid_layout,
  overrideLayout
}) => {
  // Handles the creation of a new block in the layout editor
  const id = uuid();

  // const formData = formData;
  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const layoutField = formData[blocksLayoutFieldname];

  const newBlock = {
    i: id,
    x: 0,
    y: Infinity, // puts it at the bottom
    w: 12,
    h: 2,
  };

  const newLayout = {};
  _.forEach(layoutField.mosaic_layout, (v, k) => {
    console.log('v si k', v, k);

    newLayout[k] = v.concat(newBlock);
  });

  // Object.keys(layoutField.mosaic_layout).forEach((v, k) => {
  //     console.log('v si k', v,k)
  //   newLayout[k] = v.concat(newBlock);
  // });

  return {
    // Add a new item. It must have a unique key!
    activeMosaicLayout: newLayout[activeScreenSize],

    refs: {
      ...refs,
      [id]: React.createRef(),
    },
    // Increment the counter to ensure key is always unique.
    formData: {
      ...formData,
      [blocksLayoutFieldname]: {
        ...formData[blocksLayoutFieldname],
        items: [...(formData[blocksLayoutFieldname].items || []), id],
        mosaic_layout: newLayout,
      },
      [blocksFieldname]: {
        ...formData[blocksFieldname],
        [id]: {
          '@type': type,
          fromOverriddenLayout: overrideLayout ? true : false,
        },
      },
    },
  };
  // return id;
};

export default onAddBlock;
