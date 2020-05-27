import MosaicSettingsView from './components/theme/MosaicSettingsView';
import Add from './components/manage/Add';
import Edit from './components/manage/Edit';

const routes = [
  {
    path: '/add',
    component: Add,
  },
  {
    path: '*/**/add',
    component: Add,
  },
  {
    path: '/edit',
    component: Edit,
  },
  {
    path: '*/**/edit',
    component: Edit,
  },
  {
    path: '*/mosaic-settings-view',
    component: MosaicSettingsView,
  },
];
export default routes;
