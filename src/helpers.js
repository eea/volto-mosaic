import { settings, editForms } from '~/config';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';

export function getLocation(href) {
  var match = href.match(
    /^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/,
  );
  return (
    match && {
      href: href,
      protocol: match[1],
      host: match[2],
      hostname: match[3],
      port: match[4],
      pathname: match[5],
      search: match[6],
      hash: match[7],
    }
  );
}

export function samePath(url, path) {
  // returns true if the router path is equal to the given url path
  const parsed = getLocation(url);
  const clean = url
    .replace(settings.apiPath, '')
    .replace(settings.internalApiPath, '')
    .replace(parsed.hash, '')
    .replace(parsed.search, '')
    .replace(/\/$/, '');

  const cleanPath = path.replace(/\/$/, '');
  return clean === cleanPath;
}

export function reject(obj, keys) {
  return Object.keys(obj)
    .filter(k => !keys.includes(k))
    .map(k => Object.assign({}, { [k]: obj[k] }))
    .reduce((res, o) => Object.assign(res, o), {});
}

// Instead of Object.fromEntries
export function fromEntries(iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
}

export function getOverridenBlocks(blocks) {
  return (
    blocks &&
    Object.keys(blocks)
      .filter(key => blocks[key].override === true)
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: blocks[key],
        };
      }, {})
  );
}

function getByType(props, type) {
  let res;
  switch (type) {
    case 'edit':
      res = props.content['@type'];
      break;
    case 'add':
      res = props.type;
      break;
    default:
      res = props.content['@type'];
  }
  return editForms.byType[res];
}

function getByLayout(props, type) {
  return type === 'edit' ? editForms.byLayout[props.content.layout] : null;
}

export function getEditForm(props, type = 'edit') {
  const impl =
    getByLayout(props, type) || getByType(props, type) || editForms.default;

  return impl;
}

export function fallbackLayoutFromData(formData, ids) {
  // create a default layout based on existing blocks

  const blocksFieldname = getBlocksFieldname(formData);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

  const order = formData[blocksLayoutFieldname].items || [];
  const data = formData[blocksFieldname];

  const fallbackLayout = [
    {
      // provide default block for title
      h: 1,
      i: ids.title,
      w: 12,
      x: 0,
      y: 0,
    },
    {
      // provide default block for text
      h: 3,
      i: ids.text,
      w: 12,
      x: 0,
      y: 1,
    },
  ];

  const validIds = order.filter(i => {
    return Object.keys(data).indexOf(i) > -1;
  });

  const res = validIds.map((el, ix) => {
    return {
      w: 12,
      h: ix === 0 ? 2 : 4,
      x: 0,
      y: ix === 0 ? 0 : 2 + (ix - 1) * 4,
      i: el,
    };
  });

  return res || fallbackLayout;
}
