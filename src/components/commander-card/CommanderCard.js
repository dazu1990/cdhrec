import React from 'react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Card } from '@material-ui/core';

import Img from 'gatsby-image';

import styles from './style';

type Props = {
  classes: Object,
  card: Object,
};

const CommanderCard = ({ classes, card }: Props) => {
  const cardWidth = 220;
  // console.log(card)
  return  (
  <Grid 
  className={classes.container} 
  direction='column'
  justify='center'
  alignItems='center'
  container
  >

    {!card.commanderType && (
      <div className={classes.cardImg}>
        <Img 
        style={{ width: cardWidth }} 
        fluid={card.mainImage.fluid} 
        alt={card.mainImage.title}/>
      </div>
      
    )}

    {card.commanderType && (card.commanderType[0] === 'partnered' || card.commanderType[0] === 'flip') && (
      <div className={classes.cardPartners}>
        <Img 
        style={{ width: cardWidth }} 
        fluid={card.mainImage.fluid} 
        className={classes.cardFront} 
        alt={card.mainImage.title}/>
        <Img 
        style={{ width: cardWidth }} 
        fluid={card.secondaryImage.fluid} 
        className={classes.cardBack} 
        alt={card.secondaryImage.title}/>

      </div>
      
    )}

    <div className={classes.cardName}>
      
      {card.name}
      
    </div>
    <Grid className={classes.downloads} justify='center' style={{'maxWidth': `${cardWidth}px`}}container>
      <a href={card.xml} className={classes.downloadsLink} download>
        <button>xml</button>
      </a>
      <a href={card.mse} className={classes.downloadsLink} download>
        <button>mse</button>
      </a>
    </Grid>
   
    

  </Grid>
)};


export default withStyles(styles)(CommanderCard);
