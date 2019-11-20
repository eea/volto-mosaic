/**
 * Mosaic Settings Reducer
 * @module reducers/mosaic_settings
 */

import { GET_MOSAIC_SETTINGS } from '../constants';

const initialState = {
  error: null,
  items: {},
  loaded: false,
  loading: false,
};

/**
 * Mosaic Settings reducer.
 * @function mosaic_settings
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function mosaic_settings(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_MOSAIC_SETTINGS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_MOSAIC_SETTINGS}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: action.result,
        loaded: true,
        loading: false,
      };
    case `${GET_MOSAIC_SETTINGS}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: {},
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
