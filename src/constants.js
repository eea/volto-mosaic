export const GET_MOSAIC_SETTINGS = 'GET_MOSAIC_SETTINGS';
export const SET_MOSAIC_WIDTH = 'SET_MOSAIC_WIDTH';

// 767        768-1199      1200-1599     1600+
// mobile     tablet         desktop       widescreen

export const breakpoints = { lg: 1489, md: 1094, sm: 768, xs: 0, xxs: 0 };
export const screenSizes = {
  lg: 'Unspecified (default)',
  md: 'Laptop',
  sm: 'Tablet',
  xs: 'Phone',
  xxs: 'Small screen',
};
export const rowHeight = 21;

export const availableZoomLevels = ['100%', '75%', '50%', '25%'];

export const zoomClassNames = {
  '100%': 'zoom-100',
  '75%': 'zoom-75',
  '50%': 'zoom-50',
  '25%': 'zoom-25',
};

export const zoomCoeficients = {
  '100%': 1,
  '75%': 0.75,
  '50%': 0.5,
  '25%': 0.25,
};
