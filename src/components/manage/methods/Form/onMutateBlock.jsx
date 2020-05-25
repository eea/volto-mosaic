import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';

const onMutateBlock = (
  formData,
  activeMosaicLayout,
  activeScreenSize,
  id,
  value,
) => {
  // TODO: what does this do? Explain

  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

  const layoutField = formData[blocksLayoutFieldname];
  const mosaic_layout = layoutField.mosaic_layout || {};
  mosaic_layout[activeScreenSize] = activeMosaicLayout;

  return {
    formData: {
      ...formData,
      [blocksFieldname]: {
        ...formData[blocksFieldname],
        [id]: value || null,
      },
      [blocksLayoutFieldname]: {
        items: formData[blocksLayoutFieldname].items,
        mosaic_layout,
      },
    },
  };
};

export default onMutateBlock;
