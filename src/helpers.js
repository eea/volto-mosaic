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

