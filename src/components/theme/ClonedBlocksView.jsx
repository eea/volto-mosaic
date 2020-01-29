import React from 'react';
import MosaicView from 'volto-mosaic/components/theme/View';
import { Portal } from 'react-portal';
import { Link } from 'react-router-dom';
import DefaultView from '@plone/volto/components/theme/View/DefaultView';
import penSVG from '@plone/volto/icons/pen.svg';
import { Icon } from '@plone/volto/components';
import { settings } from '~/config';

export default ({ content, ...props }) => {
  const useMosaic = content?.cloned_blocks_layout?.mosaic_layout ? true : false;
  const clonedSource = content['@components']?.['cloned_source'];
  const path = (clonedSource?.['@id'] || '')
    .replace(settings.apiPath, '')
    .replace(settings.internalApiPath, '');
  return (
    <>
      {props.token && (
        <Portal node={__CLIENT__ && document.querySelector('.toolbar-actions')}>
          {clonedSource?.can_edit && (
            <Link className="edit" to={`${path}/edit`}>
              <Icon name={penSVG} size="30px" className="circled" />
            </Link>
          )}
        </Portal>
      )}

      {useMosaic ? (
        <div id="mosaic-view">
          <MosaicView {...props} />
        </div>
      ) : (
        <DefaultView content={content} {...props} />
      )}
    </>
  );
};
