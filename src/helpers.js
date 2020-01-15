import { settings } from '~/config';


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
    .replace(parsed.search, '');

  // console.log('cleaned path from url', clean, path, url, getLocation(url));
  // console.log(clean, url, path, clean === path);

  return clean === path;
}
