import React from 'react';
import Link from 'gatsby-link';
import { withStyles } from '@material-ui/styles';

import styles from './style';
import darkModeHelper from '../../../utils/darkModeHelper';

const darkModeStore = darkModeHelper();

// type Props = {
//   classes: Object,
//   options: [],
// };


const MainNavigation = ({ classes, options }) => (
  <ul>
    {options.map((link, i) => (
      <li className={classes.menuContainer} key={i}>
        <Link
          to={link.to}
          className={classes.navLink}
          activeClassName={classes.navLinkActive}
          exact={'true'}>
          <span>{link.text}</span>
        </Link>
      </li>
    ))}
    <li className={classes.menuContainer}>
      <span
        className={classes.navLink}
        onClick={darkModeStore.toggleDarkMode}
      >
        Dark Mode
      </span>
    </li>
  </ul>
);

export default withStyles(styles)(MainNavigation);
