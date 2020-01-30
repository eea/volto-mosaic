export const GET_MOSAIC_SETTINGS = 'GET_MOSAIC_SETTINGS';

export const breakpoints = { lg: 1549, md: 1449, sm: 718, xs: 480, xxs: 0 };
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
