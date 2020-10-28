import React from 'react';
import { withStyles, Grid } from '@material-ui/styles';

// import { CommanderCard } from 'components';

import useCommanders from './useCommanders';
import styles from './style';

type Props = {
  classes: Object,
};

const CommanderList = ({ classes }: Props) => {
  const { allContentfulCommander } = useCommanders('');

  return (
    <div className={classes.container}>
      <h1>TEST HERE</h1>
      <Grid container spacing={1}>
        {allContentfulCommander.edges.map(({ node }, index) => (
          <Grid key={index} container item xs={4} spacing={3} >
            <div>{index} {node.name}</div>
          </Grid>
        ))}

      </Grid>

      
    </div>
  );
};

export default withStyles(styles)(CommanderList);
