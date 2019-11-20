import { GET_MOSAIC_SETTINGS } from '../constants';

export function getMosaicSettings() {
  return {
    type: GET_MOSAIC_SETTINGS,
    request: {
      op: 'get',
      path: `/@mosaic-settings`,
    },
  };
}
