import { Link } from 'gatsby';
import React from 'react';
import { withStyles } from '@material-ui/styles';

import { Avatar, Navigation, Animated } from 'components';

import styles from './style';
import { Container, Grid } from '@material-ui/core';

type Props = {
  classes: Object,
};

const Header = ({ classes }: Props) => (
  <header className={classes.wrapper}>

    <Grid
      container
      direction='row'
      justify='space-between'
      alignItems='center'>

        <Link to='/' className={classes.logo}>
          <Animated>
            <Avatar />
          </Animated>
        </Link>
        {/* <Link to='/' className={classes.siteName}>
          Custom Dragon Highlander
        </Link> */}


      <div className={classes.navigation}>
        <Navigation />
      </div>
    </Grid>

  </header>
);

export default withStyles(styles)(Header);
