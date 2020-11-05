import { useStaticQuery, graphql } from 'gatsby';
// ...GatsbyContentfulFluid
const useCommanders = (params) => {
  const colorsIn = ["w"]
  const colorsOut = ["u","b","r","g"]
  // (
  //   filter: {
  //     frontmatter: {title: {ne: ""}}
  //   }
  // )
  const data = useStaticQuery(
    graphql`
      query getCommander{
        allContentfulCommander(
          sort: { order: DESC, fields: [approvedOn] },
          # filter: {
          #   colorId: {in: ["w"], nin: ["u","b","r","g"]}
          # }
        ) {
          edges{
            node{
              id
              name
              slug
              colorId
              approvedOn
              commanderType
              mainImage {
                id
                fluid {
                  ...GatsbyContentfulFluid
                }
                title
              }
              secondaryImage{
                id
                fluid {
                  ...GatsbyContentfulFluid
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

