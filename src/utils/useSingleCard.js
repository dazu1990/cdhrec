import {
  useQuery,
  // gql
} from '@apollo/client';
import gql from 'graphql-tag';


const useSingleCard = (params) => {
  //const urlParams = new URLSearchParams(window.location.search);
  // const paramId = urlParams.get('id')
  const paramId = params;
  const response = useQuery(gql`
    query singleton($paramId: Int!)
      {cards(where: {id: $paramId}) {
      edges {
        node {
          cardId
          cdhCards {
            name
            status
            text
            token
            reverseRelated
            related
            prop {
              cmc
              coloridentity
              colors
              maintype
              manacost
              pt
              side
              type
            }
            set {
              muid
              num 
              picurl
              rarity
              uuid
            }
          }
        }
      }
    }
  }
  `, {
  variables: { paramId: parseInt(paramId) },
  });
  //   const c = response.data.cards.edges[0].node.cdhCards;
  //   console.log("response post massage", c);
  //   // Massage that data because Dang son.
  //   cleanCommander = {
  //     imageUrl: c.set.picurl,
  //     name: c.name,
  //     mainType: c.prop.mainType,
  //     manaCost: c.prop.cmc,
  //     cardColors: c.prop.colors,
  //     colorId: c.prop.coloridentity,
  //     pt: c.prop.pt,
  //     text: c.text,
  //     side: c.prop.side,
  //     status: c.status,
  //     relation: c.related,
  //     muid: c.set.muid,
  //     num: c.set.num,
  //     rarity: c.set.rarity,
  //     uuid: c.set.uuid,
  //     token: c.token,
  //   }
  // // } catch (e) {
  // //   console.log('something got messed', e);
  // //   errors = true;
  // // };
  // if (!paramId || errors) {
  //   cleanCommander = {
  //     imageUrl: 'https://cdn.discordapp.com/attachments/690041911620534298/859220708177739786/Salamander.png',
  //     name: '',
  //     mainType: '',
  //     manaCost: '',
  //     cardColors: '',
  //     colorId: '',
  //     pt: '',
  //     text: '',
  //     side: 'Front',
  //     status: 'Playtest',
  //     relation: '',
  //     muid: '',
  //     num: '',
  //     rarity: '',
  //     uuid: '',
  //     token: false,
  //   }
  // }

  return response;
};

export default useSingleCard;




