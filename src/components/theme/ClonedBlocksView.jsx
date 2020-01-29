import React from 'react';
import MosaicView from 'volto-mosaic/components/theme/View';
import DefaultView from '@plone/volto/components/theme/View/DefaultView';

export default ({ content, ...props }) => {
  const useMosaic = content?.cloned_blocks_layout?.mosaic_layout ? true : false;
  return useMosaic ? (
    <div id="mosaic-view">
      <MosaicView {...props} />
    </div>
  ) : (
    <DefaultView content={content} {...props} />
  );
};
