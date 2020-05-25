import React from 'react';
import { blocks } from '~/config';
import { Radio, Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components'; // EditBlock
import deleteIcon from '@plone/volto/icons/delete.svg';
import editIcon from '@plone/volto/icons/editing.svg';
import { getBlocksFieldname } from '@plone/volto/helpers';

const getBlockClass = block => {
  return (
    'block-info-data block-edit-' + (block.mosaic_box_sizing || 'fit-content')
  );
};
const renderEditBlockPlaceholder = ({
  el,
  blockid,
  formData,
  removeItem,
  activeScreenSize,
  handleOpen,
  hasClonedBehaviour,
  onOverrideBlock,
  overrideLayout,
}) => {
  const blocksFieldname = getBlocksFieldname(formData);

  let block = formData[blocksFieldname][blockid];
  const hasData = block['@type'] !== 'text';

  let title = '';

  if (!blocks.blocksConfig[block['@type']]) {
    console.warn(
      'could not find configuration for this block type',
      block['@type'],
    );
    title = 'broken block';
  } else {
    title =
      block.mosaic_block_title || blocks.blocksConfig[block['@type']].title;
  }

  return (
    <div
      className={hasData ? 'block-edit-wrapper empty' : 'block-edit-wrapper'}
    >
      <div className={getBlockClass(block)}>
        {el.h > 2 && (
          <div className="block-size-info">
            {el.w} cols x {el.h} rows
          </div>
        )}
        <div>
          {el.h > 2 && (
            <div>
              <h4>{title}</h4>
            </div>
          )}
          <Button.Group size="mini">
            <Button
              size="mini"
              icon
              color="green"
              disabled={hasClonedBehaviour && !block.override}
              onClick={() => handleOpen(blockid)}
            >
              <Icon name={editIcon} size="10" />
            </Button>
            {activeScreenSize === 'lg' && (
              <Button
                size="mini"
                icon
                color="red"
                disabled={hasClonedBehaviour && !overrideLayout}
                onClick={() => removeItem({ i: blockid })}
              >
                <Icon name={deleteIcon} size="10" />
              </Button>
            )}
            {hasClonedBehaviour ? (
              <Radio
                style={{ marginLeft: '5px' }}
                defaultChecked={block.override}
                label="override block"
                toggle
                onChange={(event, data) =>
                  onOverrideBlock(data, block, blockid)
                }
              />
            ) : (
              ''
            )}
          </Button.Group>
        </div>
      </div>
    </div>
  );
};
export default renderEditBlockPlaceholder;
