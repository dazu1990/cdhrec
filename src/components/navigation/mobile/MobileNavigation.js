import React from 'react';
import Link from 'gatsby-link';
import { withStyles } from '@material-ui/styles';
import { FaBars } from 'react-icons/fa';
import darkModeHelper from '../../../utils/darkModeHelper';

import styles from './style';

// type Props = {
//   classes: Object,
//   options: [],
//   open: Boolean,
//   onClick: () => void,
// };
const darkModeStore = darkModeHelper();

const MobileNavigation = ({ classes, options, onClick, open }) => (
  <>
    <FaBars className={classes.menuIcon} onClick={onClick} />
    {open && (
      <div className={classes.menuContainer}>
        {options.map((link, i) => (
          <div key={i}>
            <Link
              to={link.to}
              className={classes.navLink}
              activeClassName={classes.navLinkActive}
              exact={'true'}>
              <span>{link.text}</span>
            </Link>
          </div>
        ))}
        <div
          className={classes.navLink}
          onClick={darkModeStore.toggleDarkMode}
        >
          Dark Mode
        </div>
      </div>
    )}
  </>
);

export default withStyles(styles)(MobileNavigation);
