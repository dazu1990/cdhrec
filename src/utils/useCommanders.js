import { useStaticQuery,  graphql } from 'gatsby';

const useCommanders = (params) => {



  const data = useStaticQuery(
    graphql`
      query allCards{
        allWpCard(
          sort: { order: DESC, fields: [ cdhCards___set___num ] },
          filter: { cdhCards: { token :  { ne: true } } }
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
                  fieldGroupName
                  maintype
                  manacost
                  side
                  pt
                  type
                }
                name
                formatCommander
                related
                set {
                  rarity
                  picurl
                  num
                  muid
                  fieldGroupName
                  uuid
                }
                text
                token
                fieldGroupName
              }
              featuredImage {
                node {
                  srcSet
                  sourceUrl
                  localFile{
                    childImageSharp{
                      fluid(maxWidth: 375) {
                        # In the GraphQL explorer, use field names
                        # like "src". In your site's code, remove them
                        # and use the fragments provided by Gatsby.
                        src
                        # This fragment won't work in the GraphQL
                        # explorer, but you can use it in your site
                        ...GatsbyImageSharpFluid_withWebp
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
    `
  );
  return data;
};

export default useCommanders;




