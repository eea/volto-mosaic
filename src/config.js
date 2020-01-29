import * as addonReducers from './reducers';
import addonRoutes from './routes.js';

import MosaicTilesView from './components/theme/View';
import ClonedBlocksView from './components/theme/ClonedBlocksView';
import MosaicForm from './components/manage/Form';

export function applyConfig(config) {
  config.settings.nonContentRoutes.push('/mosaic-settings-view');

  return {
    ...config,
    addonReducers: {
      ...config.addonReducers,
      ...addonReducers,
    },
    views: {
      ...config.views,
      layoutViews: {
        ...config.views.layoutViews,
        cloned_blocks_view: ClonedBlocksView,
        mosaic_tiles_view: MosaicTilesView,
      },
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
