exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
}


// gatsby-node.js

// const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// exports.createResolvers = async (
//   {
//     actions,
//     cache,
//     createNodeId,
//     createResolvers,
//     store,
//     reporter,
//   },
// ) => {
//   const { createNode } = actions

//   await createResolvers({
//     WPGraphQL_MediaItem: {
//       imageFile: {
//         type: "File",
//         async resolve(source) {
//           let sourceUrl = source.sourceUrl

//           if (source.mediaItemUrl !== undefined) {
//             sourceUrl = source.mediaItemUrl
//           }

//           return await createRemoteFileNode({
//             url: encodeURI(sourceUrl),
//             store,
//             cache,
//             createNode,
//             createNodeId,
//             reporter,
//           })
//         },
//       },
//     },
//   })
// }
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

// })
