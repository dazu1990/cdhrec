import React, {useState}  from 'react';
import { useStore } from 'react-redux';

import { withStyles } from '@material-ui/styles';
import ReactCardFlip from 'react-card-flip';
import 'mana-font';
import axios from 'axios';
// import 'localstorage-polyfill';




// import { Link, graphql } from "gatsby"
import { CommanderCard } from 'components';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Accordion, 
  AccordionSummary,  
  AccordionDetails, 
  Typography,
  List,
  ListItem
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import useCommanders from '../utils/useCommanders';

import Layout from "../components/layout";
import SEO from "../components/seo";

import styles from './style';


type Props = {
  classes: Object
};



const BlogPostTemplate = ({pageContext: {cardData, deckData, tokens, related}, classes}: Props) => {
  console.log('deckData === ' , deckData)

  // const apiAuth = localStorage && localStorage.getItem && localStorage.getItem('apiCdhRec') ? JSON.parse(localStorage.getItem('apiCdhRec')) : false;

  // console.log('apiAuth', apiAuth )



  const[cardFlip,setCardFlip] = useState(false);
  const[extendCard,setExtendCard] = useState(false);



  const card = related.length > 0 ? { flipCard : true, card1: cardData, card2: related[0]} : cardData;

  const addBreaks = (text)=>{
    return text.replace('<br />','<br /><br />')
  }

  var ConvertCost = {
    colorCodes: ['W', 'U', 'B', 'R', 'G', 'C', 'X', 'Y', 'Z', 'P', 'T', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    parse: function (text,brackets) {
      let newString = `${text}`;

      let hiddenlabel = (label) => {
        return `<span style="width:0;font-size:0;opacity:0;overflow:hidden;height:0;">${label}</span>`
      }
      
      ConvertCost.colorCodes.forEach((color,i)=>{
        let checkColor = brackets ? `{${color}}` : color;
        if(!brackets){

          newString = newString.replace(/{/g,'');
          newString = newString.replace(/}/g,'');

        }
        if(color === "T"){

          newString = newString.replace( checkColor, `<i class="ms ms-tap ms-cost">${hiddenlabel(color)}</i>`)
        }else{
          newString = newString.replace( checkColor , `<i class="ms ms-${color.toLowerCase()} ms-cost">${hiddenlabel(color)}</i>`)
        }
        

      })

      return newString;
    }
  }
// // FYI THIS WILL BE DEPRECIATED 
//   const getDecklists = ()=>{


//   }


  // const pushtodecklist = ()=>{

  //   // const wpInfo = {
  //   //   username: `frontend`,
  //   //   password: `front_end2021`
  //   // }

  //   // axios.post('http://api.cdhrec.com/wp-json/jwt-auth/v1/token', wpInfo)
  //   //     .then(response => {
  //   //       console.log('response data',response.data)
  //   //       localStorage.setItem('apiCdhRec', response.data);
  //   //     });
  // }

  const renderCard = (card, index)=>{    
    // let newarray = cardFlip;

    const copyContent = ()=>{
      let copyText = document.getElementById("codeBlock");
      // copyText.focus();
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      console.log(copyText)


      document.execCommand("copy");

      // alert("Copied the xml!");
    }

    let xmlCode = `<card>
  <name>${card.title}</name>
  <text>
    <![CDATA[${card.cdhCards.text}]]>
  </text>
  <tablerow>2</tablerow>
  <set rarity="${card.cdhCards.set.rarity}" uuid="${card.cdhCards.set.uuid}" num="${card.cdhCards.set.num}" muid="${card.cdhCards.set.muid}" picurl="${card.cdhCards.set.picurl}">CDH</set>
  <related>${card.cdhCards.related}</related>
  <reverse-related>${card.cdhCards.reverseRelated}</reverse-related>

  <prop>
    <layout>normal</layout>
    <side>${card.cdhCards.prop.side}</side>
    <type>${card.cdhCards.prop.type}</type>
    <maintype>${card.cdhCards.prop.maintype}</maintype>
    <manacost>${card.cdhCards.prop.manacost}</manacost>
    <cmc>${card.cdhCards.prop.cmc}</cmc>
    <colors>${card.cdhCards.prop.colors}</colors>
    <coloridentity>${card.cdhCards.prop.coloridentity}</coloridentity>
    <pt>${card.cdhCards.prop.pt}</pt>
    <format-commander>legal</format-commander>
  </prop>
  <status>${card.cdhCards.status}</status>
</card>`


    return(  
      
      <ReactCardFlip isFlipped={cardFlip}>
        <Card>
          {/* front */}
          {/* <CardHeader 
            subheader={card.cdhCards.prop.type}
          >
          </CardHeader> */}
          <CardContent>
            <h1 >{card.title} 
            {/* {card.cdhCards.prop.manacost && (
              <span className={classes.manacost} dangerouslySetInnerHTML={{__html: ConvertCost.parse(card.cdhCards.prop.manacost, false) }}></span>
            )}  */}
            </h1>
            
            <strong>{card.cdhCards.prop.type}</strong>
            <hr></hr>
            <div dangerouslySetInnerHTML={{__html: addBreaks(ConvertCost.parse(card.cdhCards.text, true))}}>
            </div>
            <p>{card.cdhCards.prop.pt}</p>
            <Grid container justify="space-between">
              <Button  onClick={()=>{copyContent()}}>COPY XML</Button>
              <Button variant="contained" onClick={()=>setExtendCard(!extendCard)} className={classes.bumpLeft}>{extendCard ? 'hide xml' : 'show xml'}</Button>

              {/* <Button variant="contained" onClick={()=>setCardFlip(!cardFlip)} className={classes.bumpLeft}>show xml</Button> */}

            </Grid>
            {extendCard &&(
              <div>
                <textarea 
                  className={classes.invisible} 
                  id="codeBlock"             
                  value={`${xmlCode}`}></textarea>

                <pre className={classes.codeBlock} >
                  <code >
                    {xmlCode}
                  </code>
                </pre>
              </div>
            )}
          </CardContent>
          
        </Card>
        <Card>
          {/* back */}

          <CardContent>
            <textarea 
              className={classes.invisible} 
              id="codeBlock"             
              value={`${xmlCode}`}></textarea>

            <pre className={classes.codeBlock} >
              <code >
                {xmlCode}
              </code>
            </pre>

          </CardContent>
          <CardActions disableSpacing>
            <Button  onClick={()=>{copyContent()}}>COPY XML</Button>

            <Button variant="contained" onClick={()=>setCardFlip(!cardFlip)} className={classes.bumpLeft}>FLIP</Button>

          </CardActions>

        </Card>
          
      </ReactCardFlip>    
      
    )
  }


 
  return (
    <Layout className={classes.container}>
      <SEO title={card.title || `${card.card1.title} // ${card.card2.title}`} />
        <article
          itemScope
          itemType="http://schema.org/Article"
        >
          <Container className={classes.container} >
            <Grid container>
              <Grid item xs={12} md={3}>
                
                <Grid item xs={12} justify='center' alignItems='center' style={card.card1 ? {paddingTop: '1.6rem'} : {paddingTop: '0rem'}}>
                  <CommanderCard card={card}></CommanderCard>
                </Grid>
                {tokens.length > 0 &&(
                  <Grid item xs={12} >
                    {tokens.map((token)=>(
                      <CommanderCard card={token}></CommanderCard>
                    ))}
                    
                  </Grid>
                )}
                

              </Grid>
              
              {related.length === 0 && (
                <Grid item xs={12} md={6} className={classes.padBuffer}>
                  {renderCard(card)}
                </Grid>
              )}

              {related.length > 0 && (
                <Grid item xs={12} md={4} className={classes.padBuffer}>
                  {renderCard(card.card1, 0)}
                </Grid>
              )}
              
              {related.length > 0 && (
                <Grid item xs={12} md={4} className={classes.padBuffer}>
                  {renderCard(card.card2, 1)}
                </Grid>
              )}
              

            </Grid>
            <Grid item xs={12}>
              <h2>Decklists</h2>
              <List>
                  
                {deckData.map(({node},deckIndex)=>(
                  <ListItem>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${deckIndex}a-content`}
                        id={`panel${deckIndex}1a-header`}
                      >
                        <Typography>{node.deckGraphQL.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {node.deckGraphQL.decklist.map(({node: cardNode})=>(
                          <Typography>
                            cardname and number
                            {/* {cardNode.number} x {cardNode.cardname} */}
                          </Typography>
                        ))}
                        
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                ))}

              </List>
              
            </Grid>
            {/* <Button onClick={()=>pushtodecklist()}>TEST API</Button> */}
            

          </Container>
        </article>
    </Layout>
  )
}

export default withStyles(styles)(BlogPostTemplate)
