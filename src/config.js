import * as addonReducers from './reducers';
import addonRoutes from './routes.js';

import MosaicTilesView from './components/theme/View';
import MosaicForm from 'volto-mosaic/components/manage/Form';

export function applyConfig(config) {
  config.settings.nonContentRoutes.push('/mosaic-settings-view');
  config.views.layoutViews.mosaic_tiles_view = MosaicTilesView;

  return {
    ...config,
    addonReducers: {
      ...config.addonReducers,
      ...addonReducers,
    },
    editForms: {
      ...config.editForms,
      byLayout: {
        ...config.editForms?.byLayout,
        mosaic_tiles_view: MosaicForm,
      },
      byType: {
        ...config.editForms?.byType,
        'Plone Site': MosaicForm,
      },
    },
    addonRoutes: [...(config.addonRoutes || []), ...addonRoutes],
  };
}
