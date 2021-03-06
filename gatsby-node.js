const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const chunk = require(`lodash/chunk`)

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
  const { createPage } = actions

  // let

  // const setApiCdhRec = () => {
  
  //   const wpInfo = {
  //     username: `frontend`,
  //     password: `front_end2021`
  //   }
  
  //   axios.post('http://api.cdhrec.com/wp-json/jwt-auth/v1/token', wpInfo)
  //       .then(response => {
  //         // console.log('response data',response.data)
  //         localStorage.setItem('apiCdhRec', JSON.stringify(response.data));
  //       });
  

  
  // }

  


  const result = await graphql(/* GraphQL */ `
    query allCards{
        allWpCard(
          sort: { order: DESC, fields: [ cdhCards___set___num ] },
      ){
          edges {
            node {
              id
              title
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

    // const decks = await graphql(/* GraphQL */ `query decks {
    //   wpDeck {
    //     deckGraphQL {
    //       decklist {
    //         cardname
    //         fieldGroupName
    //         number
    //       }
    //       commander {
    //         ... on WpCard {
    //           id
    //           title
    //           uri
    //           slug
    //         }
    //       }
    //       author
    //       title
    //     }
    //   }
    // }
    // `)

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


    

    // let related = result.data.allWpCard.edges.filter(relation => node.cdhCards.related.includes(relation.title))


    createPage({
      path: `${convertToSlug(outerNode.title)}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: `${convertToSlug(outerNode.title)}`,
        cardData: outerNode,
        related: relations,
        tokens: tokens
      },
    })
  })
}


/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
// exports.createPages = async gatsbyUtilities => {
//   // Query our posts from the GraphQL server
//   const posts = await getCards(gatsbyUtilities)


//   // If there are no posts in WordPress, don't do anything
//   if (!posts.length) {
//     return
//   }

//   // If there are posts, create pages for them
//   await createIndividualBlogPostPages({ posts, gatsbyUtilities })

//   // And a paginated archive
//   // await createBlogPostArchive({ posts, gatsbyUtilities })
// }

/**
 * This function creates all the individual blog pages in this site
 */
// const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>{

//   return Promise.all(
//     posts.map(({ previous, post, next }) =>{
//       // createPage is an action passed to createPages
//       // See https://www.gatsbyjs.com/docs/actions#createPage for more info
//       return gatsbyUtilities.actions.createPage({
//         // Use the WordPress uri as the Gatsby page path
//         // This is a good idea so that internal links and menus work 👍
//         path: `card/${encodeURI(post.title)}`,

//         // use the blog post template as the page component
//         component: path.resolve(`./src/templates/blog-post.js`),

//         // `context` is available in the template as a prop and
//         // as a variable in GraphQL.
//         context: {
//           // we need to add the post id here
//           // so our blog post template knows which blog post
//           // the current page is (when you open it in a browser)
//           id: post.id,

//           // We also use the next and previous id's to query them and add links!
//           previousPostId: previous ? previous.id : null,
//           nextPostId: next ? next.id : null,
//         },
//       })}
//     )
//   )}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
// async function getCards({ graphql, reporter }) {
//   const graphqlResult = await graphql(/* GraphQL */ `
//     query allCards{
//         allWpCard(
//           sort: { order: DESC, fields: [ cdhCards___set___num ] },
//           filter: { cdhCards: { token :  { ne: true } } }
//       ){
//           edges {
//             previous {
//               id
//             }
//             post: node {
//               id
//               title
//             }
//             next {
//               id
//             }
//           }
//         }
//       }
//   `)

//   if (graphqlResult.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your commander cards`,
//       graphqlResult.errors
//     )
//     return
//   }

//   return graphqlResult.data.allWpCard.edges
// }
