import React from 'react';
import { withStyles } from '@material-ui/styles';

import styles from './style';

type Props = {
  classes: Object,
};

const Footer = ({ classes }: Props) => (
  <footer className={classes.container}>
    CDHrec is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC.

CDHrec may use the trademarks and other intellectual property of Wizards of the Coast LLC, which is permitted under Wizards’ Fan Site Policy. For example, Magic: The Gathering® is a trademark of Wizards of the Coast. For more information about Wizards of the Coast or any of Wizards’ trademarks or other intellectual property, please visit their website at magic.wizards.com.
    © {new Date().getFullYear()}, Built with
    {` `}
    <a href='https://www.gatsbyjs.org'>Gatsby</a>
  </footer>
);

export default withStyles(styles)(Footer);
