import React from 'react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Card, CardActionArea } from '@material-ui/core';

import Img from 'gatsby-image';

import styles from './style';

type Props = {
  classes: Object,
  card: Object,
};

// const card = 

const CommanderCard = ({ classes, card }: Props) => {
  const cardWidth = 220;
  return  (
  <Grid 
  className={classes.container} 
  direction='column'
  justify='center'
  alignItems='center'
  container
  >

    {card && !card.flipCard && (
      <Card className={classes.cardImg}>
        <CardActionArea>
        {card.featuredImage && (
          <Img 
          style={{ width: cardWidth }} 
          fluid={card.featuredImage.node.localFile.childImageSharp.fluid} 
          alt={card.title}/>
        )}
        </CardActionArea>
        {/* {card.featuredImage.node.localFile.sourceUrl} */}
        
      </Card>
      
    )} 

    {card && card.flipCard && (
      <div className={classes.cardPartners}>
        <Card className={classes.cardFront}>
          <CardActionArea>
            <Img 
            style={{ width: cardWidth }} 
            fluid={card.card1.featuredImage.node.localFile.childImageSharp.fluid} 
            alt={card.card1.title}/>
          </CardActionArea>
        </Card>
        <Card className={classes.cardBack}>
          <CardActionArea>
            <Img 
            style={{ width: cardWidth }} 
            fluid={card.card2.featuredImage.node.localFile.childImageSharp.fluid}  
            alt={card.card2.title}/>
          </CardActionArea>
        </Card>
        

      </div>
      
    )}

    

    {card && !card.flipCard && (
      <div className={classes.cardName}>
          {card.title} <br></br> {card.cdhCards.set.muid} 
      </div>
    )}

    {card && card.flipCard && (
      <div className={classes.cardName}>
        {card.card1.title} {card.card2.title}  <br></br> {card.card1.cdhCards.set.muid} {card.card2.cdhCards.set.muid}
      </div>
    )}


    

    

  </Grid>
)};


export default withStyles(styles)(CommanderCard);
