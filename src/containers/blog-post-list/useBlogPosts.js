import { useStaticQuery, graphql } from 'gatsby';

const useBlogPosts = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulCommander {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  );
  return data;
};

export default useBlogPosts;

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
