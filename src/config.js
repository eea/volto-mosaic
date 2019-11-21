// import { layoutViews } from 'volto-mosaic';
import addonRoutes from './routes.js';
import * as addonReducers from './reducers';
import MosaicTilesView from './components/theme/View';

export function applyConfig(config) {
  config.settings.nonContentRoutes.push('/mosaic-settings-view');
  config.views.layoutViews.mosaic_tiles_view = MosaicTilesView;

  return {
    ...config,
    addonReducers: {
      ...config.addonReducers,
      ...addonReducers,
    },
    addonRoutes: [...(config.addonRoutes || []), ...addonRoutes],
  };
}
