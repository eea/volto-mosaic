import { getBlocksLayoutFieldname } from '@plone/volto/helpers';

const onLayoutChange = ({ newLayout, formData, activeScreenSize }) => {
  console.debug('on layout change');
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const layoutField = formData[blocksLayoutFieldname];
  const mosaic_layout = layoutField.mosaic_layout || {};

  const size = activeScreenSize;

  // Layout hasn't been created yet
  if (Object.keys(mosaic_layout).indexOf(size) === -1) {
    return { activeMosaicLayout: newLayout };
  }

  return {
    activeMosaicLayout: newLayout,
    formData: {
      ...formData,
      [blocksLayoutFieldname]: {
        ...formData[blocksLayoutFieldname],
        mosaic_layout: {
          ...formData[blocksLayoutFieldname].mosaic_layout,
          [size]: newLayout,
        },
      },
    },
  };
};

export default onLayoutChange;
