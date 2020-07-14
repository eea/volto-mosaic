import { getBlocksFieldname } from '@plone/volto/helpers';

const handleCloseEditor = ({
  blockData,
  currentBlock,
  formData,
  changeSidebarState,
}) => {
  console.log('blockid in close', blockData)
  changeSidebarState(false);

  if (!blockData) {
    return {
      showModal: false,
      formData,
      currentBlock: null,
    };
  }

  const blockid = currentBlock;

  const blocksFieldname = getBlocksFieldname(formData);
  return {
    formData: {
      ...formData,
      [blocksFieldname]: {
        ...formData[blocksFieldname],
        [blockid]: blockData || null,
      },
    },
    showModal: false,
    preview: true,
  };
};

export default handleCloseEditor;
