import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBaseUrl } from '@plone/volto/helpers';
import { settings } from '~/config';
import { isMatch } from 'lodash';
import { Menu } from 'semantic-ui-react';

const Navigation = ({ content, ...props }) => {
  const [state, setState] = useState({
    activeItem: '',
  });
  const history = useHistory();
  return props.navigation?.items?.length ? (
    <div className="tabs-view-menu">
      <Menu fluid widths={props.navigation.items.length}>
        {props.navigation.items.map((item, index) => {
          const url = getBasePath(item.url);
          const urlArray = removeValue(url.split('/'), '');
          const name = urlArray[urlArray.length - 1];
          if (isActive(url, props.pathname) && url !== state.activeItem) {
            setState({
              ...state,
              activeItem: url,
            });
          } else if (
            !isActive(url, props.pathname) &&
            url === state.activeItem
          ) {
            setState({
              ...state,
              activeItem: '',
            });
          }
          return (
            <Menu.Item
              name={name}
              key={url}
              active={state.activeItem === url}
              onClick={() => {
                history.push(url);
              }}
            />
          );
        })}
      </Menu>
    </div>
  ) : (
    ''
  );
};

export function getBasePath(url) {
  return getBaseUrl(url)
    .replace(settings.apiPath, '')
    .replace(settings.internalApiPath, '');
}

const isActive = (url, pathname) => {
  return (
    (url === '' && pathname === '/') ||
    (url !== '' && isMatch(pathname?.split('/'), url?.split('/')))
  );
};

const getNavigation = (items, pathname, content) => {
  if (items) {
    const parentPathname = getBasePath(content?.parent?.['@id']);
    const pathnameArray = removeValue(pathname.split('/'), '');
    const parentPathnameArray = removeValue(parentPathname.split('/'), '');
    const isChild = content?.layout === 'tabs_mosaic_child_view';
    const location = !isChild ? pathnameArray : parentPathnameArray;
    const depth = !isChild ? pathnameArray.length : parentPathnameArray.length;
    return deepSearch({
      inputArray: items,
      location,
      depth,
    });
  }
};

function removeValue(arr) {
  let what,
    a = arguments,
    L = a.length,
    ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

const deepSearch = ({ inputArray = [], location, depth, start = 1 }) => {
  for (let index = 0; index < inputArray.length; index++) {
    if (
      depth === 1 &&
      inputArray[index].url?.includes(location.slice(0, start).join('/'))
    )
      return inputArray[index] || {};
    if (inputArray[index].url?.includes(location.slice(0, start).join('/'))) {
      return deepSearch({
        inputArray: inputArray[index].items,
        location,
        depth: depth - 1,
        start: start + 1,
      });
    }
  }

  return null;
};

export default connect((state, props) => ({
  content:
    state.prefetch?.[state.router.location.pathname] || state.content.data,
  pathname: state.router.location.pathname,
  navigation: getNavigation(
    state.navigation.items,
    state.router.location.pathname,
    state.prefetch?.[state.router.location.pathname] || state.content.data,
  ),
}))(Navigation);
