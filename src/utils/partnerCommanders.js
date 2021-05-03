import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import { useStaticQuery,  graphql } from 'gatsby';

const usePartnerCommanders = (params) => {

  const data = useStaticQuery(
    graphql`
      query partnerCards{
        allWpCard(
          sort: { order: DESC, fields: [ cdhCards___set___num ] },
          filter: { cdhCards: { 
            token :  { ne: true },
            text: {
              regex: "/Partner with*/"
            }
          } }
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
                status
                name
                related
                reverseRelated
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
              databaseId
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
                        srcWebp
                        srcSetWebp
                        originalImg
                        originalName
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

  const getAllPartners = () => {
    return data.allWpCard;
  }

  const flattenedList = () => {
    return data.allWpCard.edges.map(({node})=>{
      const flatObj = {
        name: node.cdhCards.name,
        muid: node.cdhCards.set.muid,
        coloridentity: node.cdhCards.prop.coloridentity,
        featuredImage: node.featuredImage ? node.featuredImage : node.cdhCards.set.picurl,
        flipCard: node.flipCard,
        cdhCards: node.cdhCards,
        postId: node.databaseId
      };
      return flatObj;
    });
  }

  const flattenedSlim = () => {
    return data.allWpCard.edges.map(({node})=>{
      const flatObj = {
        name: node.cdhCards.name,
        muid: node.cdhCards.set.muid,
        text: node.cdhCards.text,
      };
      return flatObj;
    });
  }

  const getPartner = (name) => {

    // console.log('TITLE = ',name)
    return flattenedSlim().find(card => {
      if (card.text.includes(`Partner with ${name}`)) {
        return card;
      }
    });
  }


  return {getAllPartners, flattenedList, getPartner, flattenedSlim };
};

export default usePartnerCommanders;




