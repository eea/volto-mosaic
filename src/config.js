// import { layoutViews } from 'volto-mosaic';
import addonRoutes from './routes.js';
import * as addonReducers from './reducers';
import MosaicTilesView from './components/theme/View';

export const breakpoints = { lg: 1549, md: 1086, sm: 718, xs: 480, xxs: 0 };
export const screenSizes = {
  lg: 'Desktop (default)',
  md: 'Laptop',
  sm: 'Tablet',
  xs: 'Phone',
  xxs: 'Small screen',
};
export const rowHeight = 21;

export function applyConfig(config) {
  config.settings.nonContentRoutes.push('/mosaic-settings-view');
  config.layoutViews.mosaic_tiles_view = MosaicTilesView;

  return {
    ...config,
    addonReducers: {
      ...config.reducers,
      ...addonReducers,
    },
    addonRoutes: {
      ...(config.addonRoutes || []),
      addonRoutes,
    },
  };
}
