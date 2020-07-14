import { getBlocksLayoutFieldname } from '@plone/volto/helpers';

const onLayoutSave = ({ breakpoint, formData, activeMosaicLayout }) => {
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
  const layoutField = formData[blocksLayoutFieldname];
  const mosaic_layout = layoutField.mosaic_layout || {};
  console.log('bp in layout save', breakpoint)
  mosaic_layout[breakpoint ? breakpoint : 'lg'] = activeMosaicLayout;

  return {
    // activeMosaicLayout: mosaic_layout,
    formData: {
      ...formData,
      blocks_layout: {
        ...formData.blocks_layout,
        mosaic_layout,
      },
    },
  };
};

export default onLayoutSave;
