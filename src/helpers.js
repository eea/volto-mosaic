import { settings, editForms } from '~/config';

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
  return Object.keys(blocks)
    .filter(key => blocks[key].override === true)
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: blocks[key],
      };
    }, {});
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
