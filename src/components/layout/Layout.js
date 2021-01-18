import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import { Box} from '@material-ui/core';

import Fade from '@material-ui/core/Fade';
import classNames from 'classnames';

import { Header, Footer } from 'components';

import styles from './style';

require('typeface-roboto');

type Props = {
  classes: Object,
  children: HTMLElement,
  noBackground: Boolean,
};

const Layout = ({ classes, children, noBackground }: Props) => (
  <Box
    autoHide
    autoHideTimeout={1000}
    autoHideDuration={200}
    renderView={props => <div {...props} className={classes.scrollFix} />}
    className={classes.container}>
    <Header />

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
  
);

export default withStyles(styles)(Layout);
