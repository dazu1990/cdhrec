const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const chunk = require(`lodash/chunk`);
const { default: axios } = require("axios");
// let token;

const convertToSlug = (Text) =>{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}


exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}


exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}



exports.createPages = async ({ graphql, actions }) => {

  const getDecksV2 = async ( graphql ) => {
    try {
        const resp = await graphql(/* GraphQL */ `
          query allDecks {
            allWpDeck {
              edges {
                node {
                  deckGraphQL {
                    commander {
                      ... on WpCard {
                        id
                        cdhCards {
                          name
                          set {
                            muid
                          }
                        }
                      }
                    }
                    decklist {
                      cardname
                      number
                    }
                    title
                  }
                  id
                  slug
                }
              }
            }
          }
        `);
        return resp.data
        // console.log(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error('ERROR IN getDecksV2',err);
        // return false
    }
  };

  const allDecks = await getDecksV2(graphql)

  const filterDecksByMuid = (muid) => {
    let decksToPush =  allDecks.allWpDeck.edges.filter(({node : deckNode})=>{
      if(deckNode.deckGraphQL.commander.cdhCards.set.muid === muid){
        return deckNode
      }
    })
    return decksToPush
  }

  const { createPage } = actions

  const result = await graphql(/* GraphQL */ `
    query allCards{
        allWpCard(
          sort: { order: DESC, fields: [ cdhCards___set___num ] },
      ){
          edges {
            node {
              id
              title
              databaseId
              cdhCards {
                prop {
                  cmc
                  coloridentity
                  colors
                  maintype
                  manacost
                  side
                  pt
                  type
                }
                status
                name
                related
                reverseRelated
                set {
                  rarity
                  picurl
                  num
                  muid
                  uuid
                }
                text
                token
              }
              featuredImage {
                node {
                  srcSet
                  sourceUrl
                  localFile{
                    childImageSharp{
                      fluid(maxWidth: 375) {
                        base64
                        aspectRatio
                        src
                        srcSet
                        srcWebp
                        srcSetWebp
                        sizes
                      }
                      gatsbyImageData
                    }
                  }
                }
              }
            }
          }
        }
      }
  `)

  result.data.allWpCard.edges.forEach(({ node : outerNode }) => {

    // let myPromise = new Promise(function(myResolve, myReject) {
    //   let deckData = filterDecksByMuid(outerNode.cdhCards.set.muid) ;
    
    // // The producing code (this may take some time)
    
    //   if (deckData) {
    //     myResolve("OK");
    //   } else {
    //     myReject("Error");
    //   }
    // });
    
    // myPromise.then(
    //   function(value) {myDisplayer(value);},
    //   function(error) {myDisplayer(error);}
    // );

    const deckData=  filterDecksByMuid(outerNode.cdhCards.set.muid) || []
    let relations = []
    let tokens = []
    if (outerNode.cdhCards.related || outerNode.cdhCards.reverseRelated){
      result.data.allWpCard.edges.forEach(({node : innernode}) => {
        if((outerNode.cdhCards.related && outerNode.cdhCards.related.includes(innernode.title)) || (outerNode.cdhCards.reverseRelated && outerNode.cdhCards.reverseRelated.includes(innernode.title))){
          if(innernode.cdhCards.token){
            tokens.push(innernode)
          }else{
            relations.push(innernode)
          }
          
        }
      })

    }

    createPage({
      path: `${convertToSlug(outerNode.title)}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: `${convertToSlug(outerNode.title)}`,
        deckData: deckData,
        cardData: outerNode,
        related: relations,
        tokens: tokens
      }
    })
  })
}

