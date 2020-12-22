import React from "react"
import { withStyles } from '@material-ui/styles';

// import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import { CommanderCard } from 'components';
import { Container, Grid, Card, CardContent } from '@material-ui/core';
// import useCommanders from '../utils/useCommanders';

import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from './style';


type Props = {
  classes: Object
};



const BlogPostTemplate = ({pageContext: {cardData, tokens, related}, classes}: Props) => {
  // console.log(cardData, related, tokens)
  const card = related.length > 0 ? { flipCard : true, card1: cardData, card2: related[0]} : cardData;


  const renderCard = (card)=>{    
    return(      
      <Card>
        <CardContent>

          <h1 itemProp="headline">{card.title}</h1>

          {card.cdhCards.prop.manacost}
          <br></br>
          <div>
            {card.cdhCards.prop.type}
          </div>
          <div dangerouslySetInnerHTML={{__html: card.cdhCards.text}}>
          </div>
          <p>{card.cdhCards.prop.pt}</p>
        </CardContent>
      </Card>
    )
  }


 
  return (
    <Layout>
      <SEO title={card.title || `${card.card1.title} // ${card.card2.title}`} />
      
        <article
          itemScope
          itemType="http://schema.org/Article"
        >
          <Container className={classes.container} >
            <Grid container>
              <Grid item xs={12} md={3}>
                <CommanderCard card={card}></CommanderCard>
              </Grid>
              
              {related.length == 0 && (
                <Grid item xs={12} md={4}>
                  {renderCard(card)}
                </Grid>
              )}

              {related.length > 0 && (
                <Grid item xs={12} md={4}>
                  {renderCard(card.card1)}
                </Grid>
              )}
              
              {related.length > 0 && (
                <Grid item xs={12} md={4}>
                  {renderCard(card.card2)}
                </Grid>
              )}
              
              {/* <pre>
                <code>
                {`<card>
                <name>${card.title}</name>
                  <text><![CDATA[${card.cdhCards.text}]]></text>
                  <tablerow>2</tablerow>
                  <set rarity="${card.cdhCards.set.rarity}" uuid="${card.cdhCards.set.uuid}" num="${card.cdhCards.set.num}" muid="${card.cdhCards.set.muid}" picurl="${card.cdhCards.set.picurl}">CDH</set>
                  <related>${card.cdhCards.related}</related>
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
                </card> `}
                </code>
              </pre> */}

            </Grid>
            

          </Container>
        </article>
    </Layout>
  )
}

export default withStyles(styles)(BlogPostTemplate)
