import React from 'react';
import { withStyles } from '@material-ui/styles';

// import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Box} from '@material-ui/core';

import Fade from '@material-ui/core/Fade';
import classNames from 'classnames';

import { Header, Footer } from 'components';

import styles from './style';

require('typeface-roboto');

// type Props = {
//   classes: Object,
//   children: HTMLElement,
//   noBackground: Boolean,
// };

const Layout = ({ classes, children, noBackground }) => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // ${prefersDarkMode ? classes.darkmode : ''}
  return (
  <Box
    autoHide
    autoHideTimeout={1000}
    autoHideDuration={200}
    renderView={props => <div {...props} className={classes.scrollFix} />}
    className={`${classes.container} `}>
    <Header/>
    <div id="back-to-top"></div>

    <div
      className={classNames(
        classes.pageContainer,
        !noBackground && classes.background
      )}>
      <Fade in mountOnEnter unmountOnExit>
        <main className={classes.content}>{children}</main>
      </Fade>
    </div>
        

  </Box>
  
)};

export default withStyles(styles)(Layout);
