import { useStaticQuery, graphql } from 'gatsby';

const useCommanders = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulCommander {
          edges {
            node {
              name
              colorId
              approvedOn
              cardImage {
                fluid {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
                title
              }
            }
          }
        }
      }
    `
  );
  return data;
};

export default useCommanders;

// allContentfulCommander(sort: { order: DESC, fields: publishDate }) {

// title
//               author {
//                 name
//               }
//               publishDate
//               body {
//                 childMarkdownRemark {
//                   html
//                 }
//               }
//               heroImage {
//                 fluid(maxWidth: 960) {
//                   ...GatsbyContentfulFluid_withWebp
//                 }
//               }
