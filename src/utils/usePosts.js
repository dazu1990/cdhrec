import { useStaticQuery,  graphql } from 'gatsby';

const usePosts = (params) => {

  const data = useStaticQuery(
    graphql`
      query allPosts{
        allWpPost{
          edges {
            node {
              content
              title
              categories {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    `
  );
  return data;
};

export default usePosts;




