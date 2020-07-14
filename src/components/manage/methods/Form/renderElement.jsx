import React from 'react';
import { BlockViewWrapper } from 'volto-mosaic/components/theme/View';

const renderElement = ({
  el,
  showUpdate,
  preview,
  formData,
  ref,
  renderEditBlockPlaceholder,
  removeItem,
  activeScreenSize,
  handleOpen,
  hasClonedBehaviour,
  onOverrideBlock,
  overrideLayout,
}) => {
  const blockid = el.i;

  const i = el.add ? '+' : el.i;

  return (
    <div key={i} data-grid={el}>
      {preview ? (
        <BlockViewWrapper
          useref={ref}
          formData={formData}
          blockid={blockid}
          showUpdate={() => showUpdate(blockid)}
        />
      ) : (
        renderEditBlockPlaceholder({
          formData,
          el,
          blockid,
          removeItem,
          activeScreenSize,
          handleOpen,
          hasClonedBehaviour,
          onOverrideBlock,
          overrideLayout,
        })
      )}
    </div>
  );
};

export default renderElement;
