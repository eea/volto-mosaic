import { SET_MOSAIC_WIDTH } from '../constants';

const initialState = {
  error: null,
  items: null,
  loaded: false,
  loading: false,
};

/**
 * Navigation reducer.
 * @function navigation
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function mosaic_width(state = initialState, action = {}) {
  if (action.type === SET_MOSAIC_WIDTH) {
    return {
      ...state,
      error: null,
      items: action.payload,
      loaded: true,
      loading: false,
    };
  }
  return state;
}
