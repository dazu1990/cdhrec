import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/styles';
import theme from 'styles/theme';

export const wrapRootElement = ({ element }) => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

 return (
  <ThemeProvider theme={theme} >
    <CssBaseline />
    {element}
  </ThemeProvider>
 );
};
