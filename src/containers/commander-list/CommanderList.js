import React, {useState, useEffect}  from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Container } from '@material-ui/core';


// import { CommanderCard } from '../../components';
import { CommanderCard } from 'components';
import { BlogPost } from 'components';



import useCommanders from './useCommanders';
import ColorSelector from './ColorSelector';


import styles from './style';

type Props = {
  classes: Object,
};

const CommanderList = ({ classes }: Props) => {
  const[descAsc,setDescAsc] = useState(1);
  const[colorFilter,setColorFilter] = useState([]);


  const descAscDisplay = !descAsc ? `desc` : `asc`;

  const { allContentfulCommander } = useCommanders();
  const filteredCommanders= allContentfulCommander.edges.filter(({node})=>{
    const isEqual = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort());
    if(colorFilter.length > 0){
      return isEqual(node.colorId, colorFilter);
    }else{
      return node;
    }
    
  });

  // useEffect(() => {
  //   console.log('colorFilter PARENT', colorFilter)
  // }, [colorFilter ]);
  // console.log(CommanderCard)

  return (
    <Container className={classes.container}>
      <h1>T {colorFilter[0]}</h1>
      <button onClick={()=>setDescAsc(!descAsc)}>{descAscDisplay}</button>
      <ColorSelector  setColorFilter={setColorFilter}></ColorSelector>
      <Grid container spacing={1} className={classes.grid}>
        {filteredCommanders.map(({ node }, index) => (
          <Grid key={index} container item xs={12} sm={6} md={3} >
            <CommanderCard card={node} />
          </Grid>
        ))}

      </Grid>

      
    </Container>
  );
};

export default withStyles(styles)(CommanderList);
