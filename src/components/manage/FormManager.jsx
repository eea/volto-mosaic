import React, { useState } from 'react';
import { getOverridenBlocks } from 'volto-mosaic/helpers';

const FormManager = WrappedComponent => props => {
  const [formData, setFormData] = useState(props.formData);
  const [activeScreenSize, setActiveScreenSize] = useState('lg');
  console.log('formData in manage', formData);

  const hasClonedBehaviour = props.formData.layout === 'cloned_blocks_view';

  const overridenBlocks = hasClonedBehaviour
    ? getOverridenBlocks(formData.blocks)
    : {};
  console.log('overriden blocks', overridenBlocks);

  const blocks = hasClonedBehaviour
    ? { ...formData.cloned_blocks, ...overridenBlocks }
    : formData.blocks;

  let blocks_layout = formData.blocks_layout;
  if (hasClonedBehaviour && formData.blocks_layout?.overrideLayout === true) {
    if (formData.blocks_layout?.items?.length === 0) {
      blocks_layout = formData.cloned_blocks_layout;
    }
  }
  if (hasClonedBehaviour && !formData.blocks_layout?.overrideLayout) {
    blocks_layout = formData.cloned_blocks_layout;
  }

  const updatedProps = {
    ...props,
    formData: {
      ...formData,
      blocks,
      blocks_layout,
    },
    setFormData,
    setActiveScreenSize,
    activeScreenSize,
    hasClonedBehaviour,
  };
  console.log('updated props', updatedProps)
  return <WrappedComponent {...updatedProps} />;
};

export default FormManager;
