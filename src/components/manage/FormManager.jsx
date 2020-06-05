import React, { useState } from 'react';
import { getOverridenBlocks } from 'volto-mosaic/helpers';
import { fallbackLayoutFromData } from 'volto-mosaic/helpers';
import { v4 as uuid } from 'uuid';

const FormManager = WrappedComponent => props => {
  const ids = {
    title: uuid(),
    text: uuid(),
  };
  const [formData, setFormData] = useState(props.formData);
  const [activeScreenSize, setActiveScreenSize] = useState('lg');
  const [activeMosaicLayout, setActiveMosaicLayout] = useState(
    props.formData?.blocks_layout?.mosaic_layout?.[activeScreenSize] ||
      fallbackLayoutFromData(props.formData, ids),
  );

  console.log('formData in manage', formData, props);

  const hasClonedBehaviour = props.formData.layout === 'cloned_blocks_view';

  const overridenBlocks = hasClonedBehaviour
    ? getOverridenBlocks(formData.blocks)
    : {};
  console.log('overriden blocks', overridenBlocks);

  // const blocks = hasClonedBehaviour
  //   ? { ...formData.cloned_blocks, ...overridenBlocks }
  //   : formData.blocks;

  let blocks = formData.blocks;
  if (hasClonedBehaviour && formData.blocks_layout?.overrideLayout === true) {
    blocks = {
      ...formData.blocks,
      ...formData.cloned_blocks,
      ...overridenBlocks,
    };
  }
  if (hasClonedBehaviour && !formData.blocks_layout?.overrideLayout) {
    blocks = { ...formData.cloned_blocks, ...overridenBlocks };
  }

  let blocks_layout = formData.blocks_layout;
  if (hasClonedBehaviour && formData.blocks_layout?.overrideLayout === true) {
    if (formData.blocks_layout?.items?.length === 0) {
      console.log('has cloned behaviour and override but no items');
      blocks_layout = formData.cloned_blocks_layout;
    }
  }
  if (hasClonedBehaviour && !formData.blocks_layout?.overrideLayout) {
    console.log('has cloned behaviour and no override');
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
    activeMosaicLayout,
    setActiveMosaicLayout,
    hasClonedBehaviour,
    ids,
  };
  console.log('updated props', updatedProps);
  return <WrappedComponent {...updatedProps} />;
};

export default FormManager;
