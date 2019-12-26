import MosaicSettingsView from './components/theme/MosaicSettingsView';
// import EditMosaic from './components/manage/Edit';

const routes = [
  // {
  //   path: '/edit',
  //   component: EditMosaic,
  // },
  // {
  //   path: '*/**/edit',
  //   component: EditMosaic,
  // },
  {
    path: '*/mosaic-settings-view',
    component: MosaicSettingsView,
  },
];
export default routes;
