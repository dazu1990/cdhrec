import React, {useState, useEffect}  from 'react';
import { useStore } from 'react-redux';

import { withStyles } from '@material-ui/styles';
import ReactCardFlip from 'react-card-flip';
import 'mana-font';
import axios from 'axios';


import { CommanderCard } from 'components';
import decodehtml from '../utils/decodehtml';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import useCommanders from '../utils/useCommanders';

import Layout from "../components/layout";
import SEO from "../components/seo";

import styles from './style';



// type Props = {
//   classes: Object
// };

const ListItemLink = (props) =>  {
  return <ListItem button component="a" {...props} />;
}



const BlogPostTemplate = ({pageContext: {cardData, deckData, tokens, related}, classes}) => {
  // console.log('deckData === ' , deckData)

  // const apiAuth = typeof window !== 'undefined' ? JSON.parse(global.sessionStorage.getItem('apiCdhRec')) : false;




  const[cardFlip,setCardFlip] = useState(false);
  const[extendCard,setExtendCard] = useState(false);
  const[currentDeck,setCurrentDeck] = useState({index: 0 , type: 'old'});

  const [newDecks, setNewDecks] = useState([])
  const [deckCheck, setDeckCheck] = useState(false)

  useEffect(() => {

      // https://api.cdhrec.com/wp-json/acf/v3/decks
      // https://api.cdhrec.com/wp-json/wp/v2/decks
    if(!deckCheck){
      fetch(`https://api.cdhrec.com/wp-json/wp/v2/decks`)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        const oldDeck = deckData.map((prevdeck)=>{
          const name = `${prevdeck.node.slug}`;
          return(name)
        })
        // console.log(oldDeck, deckData)
        const filteredResultData = resultData.filter(deck=>{
          if((deck.acf.commander === cardData.databaseId) || (deck.acf.partner && deck.acf.partner.ID === cardData.databaseId) ){
            // console.log('oldDeck.includes(deck.slug)', oldDeck.includes(deck.slug), deck.slug, oldDeck)
            if(!oldDeck.includes(deck.slug)){
              return deck
            }
          }
        })
        setNewDecks(filteredResultData)

      }) // set data for the number of stars
      setDeckCheck(true)

    }
    

  }, [])




  const card = related.length > 0 ? { flipCard : true, card1: cardData, card2: related[0]} : cardData;

  const addBreaks = (text)=>{
    return text.replace('<br />','<br /><br />')
  }

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
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

          newString = newString.replace( new RegExp(escapeRegExp(checkColor), 'g'), `<i class="ms ms-tap ms-cost">${hiddenlabel(color)}</i>`)
        }else{
          newString = newString.replace( new RegExp(escapeRegExp(checkColor), 'g') , `<i class="ms ms-${color.toLowerCase()} ms-cost">${hiddenlabel(color)}</i>`)
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
                <Grid item xs={12} md={9} className={classes.padBuffer}>
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
             <Paper >
              <Grid container xs={12}>
                <Grid container xs={12} sm={6} style={{padding: '1rem'}}>
                  <Grid item xs={12}>
                    <h2>Decks for:</h2>
                    <h3>{card.title}</h3>
                    <List aria-label="decklists" className={classes.cardList}>
                      {deckData.length < 1 && newDecks.length < 1 && (
                        <Typography>There aren't any decks for {card.title}.<br></br> Why don't you add one <a href="/recommend">here</a></Typography>
                      )}
                      {newDecks.map((deck,deckIndex)=>(
                        <ListItem 
                          key={`newdeck_${deckIndex}`} 
                          button 
                          onClick={()=>{setCurrentDeck({index: deckIndex, type: 'new'})}}
                          className={classes.cardListItem}
                        >    
                          <ListItemText primary={decodehtml(deck.title.rendered)}></ListItemText>
                        </ListItem>
                      ))}
                      {deckData.map(({node},deckIndex)=>(
                        <ListItem 
                          key={`deck_${deckIndex}`} 
                          button 
                          onClick={()=>{setCurrentDeck({index: deckIndex, type: 'old'})}}
                          className={classes.cardListItem}
                        >    
                          <ListItemText primary={node.deckGraphQL.title}></ListItemText>
                        </ListItem>
                      ))}
                      {deckData.length > 0 && (
                        <ListItem 
                          button 
                          className={classes.cardListItem}
                        >
                          <ListItemLink href="/recommend">
                            <ListItemText primary={'Add another deck here!'}></ListItemText>
                          </ListItemLink>
                        
                        </ListItem>
                      )}
                    </List>
                  </Grid>
                </Grid>
                <Grid container xs={12} sm={6} style={{padding: '1rem'}}>
                  
                  <h2 className={classes.deckSectionTitle}>Cards in:</h2>
                  {currentDeck.type === 'old' && (
                    <h3>{deckData[currentDeck.index] ? decodehtml(deckData[currentDeck.index].node.deckGraphQL.title) : 'non-existent deck'}</h3>
                  )}
                  {currentDeck.type === 'new' && (
                    <h3>{newDecks[currentDeck.index] ? decodehtml(newDecks[currentDeck.index].title.rendered) : 'non-existent deck'}</h3>
                  )}
                  <Grid item xs={12}>
                    {currentDeck.type === 'old' && (
                      <List className={classes.cardList}>
                        {deckData.length < 1 && (
                          <Typography>{'There are no cards'}</Typography>
                        )}
                        {deckData[currentDeck.index] && deckData[currentDeck.index].node.deckGraphQL.decklist.map((card, cardIndex) => (
                          <ListItem key={`card_${cardIndex}`} className={classes.cardListItem}>
                            <ListItemText primary={`${card.number} ${card.cardname}`}></ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    )}

                    {currentDeck.type === 'new' && (
                      <List className={classes.cardList}>
                        {newDecks.length < 1 && (
                          <Typography>{'There are no cards'}</Typography>
                        )}
                        {newDecks[currentDeck.index] && newDecks[currentDeck.index].acf.decklist.map((card, cardIndex) => (
                          <ListItem key={`card_${cardIndex}`} className={classes.cardListItem}>
                            <ListItemText primary={`${card.number} ${card.cardname}`}></ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    )}
                    
                  </Grid>
                </Grid>
              </Grid>

            </Paper>

          </Container>
        </article>
    </Layout>
  )
}

export default withStyles(styles)(BlogPostTemplate)
