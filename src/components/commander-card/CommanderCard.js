import React from 'react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Card, CardActionArea, CardContent } from '@material-ui/core';

import Img from 'gatsby-image';

import styles from './style';

type Props = {
  classes: Object,
  card: Object,
};

// const card = 

const CommanderCard = ({ classes, card }: Props) => {
  const cardWidth = 220;
  const cardHeight = 310;

  const noImageCard = (card)=>{
    if(!card.featuredImage){
      return(
        <Card 
        style={{ width: cardWidth, height: cardHeight }} 
        >
    
          <CardContent>
            <strong>{card.title}</strong><br></br>
            {card.cdhCards.prop.manacost}
            <br></br>
            <div>
              {card.cdhCards.prop.type}
            </div>
            <div dangerouslySetInnerHTML={{__html: card.cdhCards.text}} className={classes.cardBodyCopy}>
            </div>
            <p>{card.cdhCards.prop.pt}</p>
            <i>*image not available</i>
          </CardContent>
          
        </Card>
      )
    }
    
  }
  

  // console.log(card)
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
          {noImageCard(card)}
        </CardActionArea>
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
            {noImageCard(card.card1)}

          </CardActionArea>
        </Card>
        <Card className={classes.cardBack}>
          <CardActionArea>
            <Img 
            style={{ width: cardWidth }} 
            fluid={card.card2.featuredImage.node.localFile.childImageSharp.fluid}  
            alt={card.card2.title}/>
            {noImageCard(card.card2)}

          </CardActionArea>
        </Card>
        

      </div>
      
    )}

    

    {card && !card.flipCard && (
      <div className={classes.cardName}>
          {card.title} <br></br> #{card.cdhCards.set.muid} 
      </div>
    )}

    {card && card.flipCard && (
      <div className={classes.cardName}>
        {card.card1.title} // {card.card2.title}  <br></br> #{card.card1.cdhCards.set.muid} // #{card.card2.cdhCards.set.muid}
      </div>
    )}


    

    

  </Grid>
)};


export default withStyles(styles)(CommanderCard);
