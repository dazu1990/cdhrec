import React, {useState}  from 'react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, Card, CardActionArea, CardContent } from '@material-ui/core';


import Img from 'gatsby-image';

import styles from './style';


// export const dumbImg = ({ src, srcOnError}) => {
//   const [srcImg, setSrcImg] = useState(null);

//   const onError = () => {
//     setSrcImg(srcOnError);
//   };


//   if (srcImg) {
//     return <img src={srcImg} />;
//   }

//   return <img src={src} onError={onError}  />;
// };

// type Props = {
//   classes: Object,
//   card: Object,
// };

// const card = 

const CommanderCard = ({ classes, card }) => {
  const cardWidth = 220;
  const cardHeight = 310;
  const[ imageExists,setImageExists] = useState(true) ;

  // console.log(card)




  const noImageCard = (card)=>{
    
    if(!card.featuredImage || !card.featuredImage.node ){
      return(
        <>
          {imageExists && (
            <img 
            style={{ width: cardWidth }} 
            src={card.cdhCards.set.picurl || ''} 
            alt={card.title}
            onError={()=>{setImageExists(false); }}
    
            />
          )}
          {!imageExists && (
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
          )}
        </>
      )
    }
  }
  
  // noImageCard(card)
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

          {card.featuredImage && card.featuredImage.node && card.featuredImage.node.localFile.childImageSharp.fluid && (
            <Img 
            style={{ width: cardWidth }} 
            // src={card.featuredImage.node.localFile.url} 
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
            {card.card1.featuredImage && (
            <Img 
            style={{ width: cardWidth }} 
            fluid={card.card1.featuredImage.node && card.card1.featuredImage.node.localFile.childImageSharp.fluid} 
            alt={card.card1.title}/>
            )}

            {noImageCard(card.card1)}

          </CardActionArea>
        </Card>
        <Card className={classes.cardBack}>
          <CardActionArea>
            {card.card2.featuredImage && (
              <Img 
              style={{ width: cardWidth }} 
              fluid={card.card2.featuredImage.node && card.card2.featuredImage.node.localFile.childImageSharp.fluid}  
              alt={card.card2.title}/>
            )}
            {noImageCard(card.card2)}

          </CardActionArea>
        </Card>
      </div>
      
    )}

    

    {card && !card.flipCard && (
      <div className={classes.cardName}>

          {card.title || card.name}
          {card.cdhCards.status !== 'Approved' && (
            <span> (Playtesting)</span>
          )}
           <br></br> muid #{card.cdhCards.set.muid} 
      </div>
    )}

    {card && card.flipCard && (
      <div className={classes.cardName}>
        {card.card1.title || card.card1.name} // {card.card2.title || card.card2.name}  
        {card.card1.cdhCards.status !== 'Approved' && (
          <span> (Playtesting)</span>
        )}
        <br></br> muid #{card.card1.cdhCards.set.muid} // #{card.card2.cdhCards.set.muid}
      </div>
    )}


    

    

  </Grid>
)};


export default withStyles(styles)(CommanderCard);
