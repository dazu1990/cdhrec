import React from 'react';
import { withStyles } from '@material-ui/styles';
// Grid, Container,
import { Grid, Container, Typography, ButtonGroup, Button, Divider, InputBase, Link, IconButton, Card } from '@material-ui/core';


import styles from './style';

type Props = {
  classes: Object,
};

const Footer = ({ classes }: Props) => (
  <footer className={classes.container}>
    <Container>
      <Grid container>
        <Typography variant="caption">
        CDHrec is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC.<br></br>
        CDHrec may use the trademarks and other intellectual property of Wizards of the Coast LLC, which is permitted under Wizards’ Fan Site Policy. For example, Magic: The Gathering® is a trademark of Wizards of the Coast. For more information about Wizards of the Coast or any of Wizards’ trademarks or other intellectual property, please visit their website at magic.wizards.com.
        </Typography>
      

      </Grid>
    

    </Container>

   
  </footer>
);

export default withStyles(styles)(Footer);
