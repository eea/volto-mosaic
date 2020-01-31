import { GET_MOSAIC_SETTINGS, SET_MOSAIC_WIDTH } from '../constants';

export function getMosaicSettings() {
  return {
    type: GET_MOSAIC_SETTINGS,
    request: {
      op: 'get',
      path: `/@mosaic-settings`,
    },
  };
}

export function setMosaicWidth(width) {
  return {
    type: SET_MOSAIC_WIDTH,
    payload: width,
  };
}
