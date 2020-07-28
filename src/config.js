import * as addonReducers from './reducers';
import addonRoutes from './routes.js';

import MosaicTilesView from './components/theme/View';
import MosaicForm from './components/manage/Form';
import ClonedBlocksView from './components/theme/ClonedBlocksView';
import TabsMosaicView from './components/theme/Tabs/View';
import TabsMosaicChildView from './components/theme/Tabs/View';

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
        tabs_mosaic_view: TabsMosaicView,
        tabs_mosaic_child_view: TabsMosaicChildView,
      },
    },
    editForms: {
      ...config.editForms,
      byLayout: {
        ...config.editForms?.byLayout,
        cloned_blocks_view: MosaicForm,
        mosaic_tiles_view: MosaicForm,
        tabs_view_mosaic: MosaicForm,
        tabs_mosaic_child_view: MosaicForm,
      },
      byType: {
        ...config.editForms?.byType,
        'Plone Site': MosaicForm,
      },
    },
    addonRoutes: [...(config.addonRoutes || []), ...addonRoutes],
  };
}
