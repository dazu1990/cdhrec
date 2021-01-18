import React, {useState, useEffect}  from 'react';
import Fuse from 'fuse.js'
import { withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Grid, GridList, GridListTile, GridListTileBar ,Container, TextField, ButtonGroup, Button, Link, IconButton, Card } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';

import Typography from '@material-ui/core/Typography';




// import { CommanderCard } from '../../components';
import { CommanderCard } from 'components';
import { BlogPost } from 'components';



import useCommanders from '../../utils/useCommanders';
import ColorSelector from './ColorSelector/ColorSelector';


import styles from './style';

type Props = {
  classes: Object,
};

const CommanderList = ({ classes }: Props) => {
  
  const[colorFilter,setColorFilter] = useState("");

  const [lastScrollTop, setLastScrollTop] = useState(0);


  const[descAsc,setDescAsc] = useState(1);
  const[alphabetical,setAlphabetical] = useState(1);
  const[approvedFilter,setApprovedFilter] = useState(1);


  const descAscDisplay = !descAsc ? `new to old` : `old to new`;
  const alphabeticalDisplay = !alphabetical ? `A > Z` : `Z > A`;
  // const activeOrder = ()=>{
  //   if(descAsc && )
  // }


  const [searchQuery, setSearchQuery] = useState("");
  const[searchResult,setSearchResult] = useState([]);
  const { allWpCard } = useCommanders();
  // const[commanderList, setCommanderList] = useState(allWpCard.edges);


  const maxCards = 100;
  const[currentChunk,setCurrentChunk] = useState(maxCards);


  // const[maxCardsChunks,setMaxCardsChunks] = useState(1);


  const convertToSlug = (Text) =>{
    if(Text){
      return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
    }
    
  }

  const colorToWords = (color) => {
    let filter = Array.from(color);
    let newString = '';

    filter.forEach((colorLetter,index) => {
      if(index !== 0){
        newString = newString + ' ';
      }
      switch(colorLetter){
        case 'C':
          newString = newString + 'colorless'
          break;
        case 'W':
          newString = newString + 'white';
          break;
        case 'B':
          newString = newString + 'black';
          break;
        case 'U':
          newString = newString + 'blue';
          break;
        case 'R':
          newString = newString + 'red';
          break;
        case 'G':
          newString = newString + 'green';
          break;
        default:
          newString = newString + color;
          break;
      }
      
    });
    return newString;
  }


  const handleSearch = (event)=>{
    // setMaxCards(100)

    if(event.target.value.length > 2){
      setSearchQuery(event.target.value)
      let results = fuse.search(searchQuery);
      results = results.map(({item})=>{
        let fullcard = allWpCard.edges.find(obj => obj.node.cdhCards.set.muid === item.muid);
        return(fullcard)
      });

      setSearchResult(results)
      // setMaxCardsChunks(results/maxCards)

    }else if (event.target.value.length === 0){
      setSearchQuery(event.target.value)
      setSearchResult("")
      // setMaxCardsChunks(allWpCard.edges/maxCards)

    }
    // setMaxCards(100)


    // event.preventDefault();

    
  }

  const backToTop = (event)=>{
    // const anchor = (event.target.ownerDocument || document ).querySelector('#back-to-top-anchor');
    // // (event.target.ownerDocument || document ).querySelector('#back-to-top-anchor');
    // if (anchor) {
    //   anchor.scrollIntoView();
    // }
    window.scrollTo(0,0)
  }
  // let toggle = true;
  const handleScroll = () => {
    // console.log(commanderList)
    const currentScrollTop = document.getElementById('grid').scrollTop;
    const innerHeight = document.getElementById('grid').scrollHeight

    setLastScrollTop(currentScrollTop);

    

    // if(lastScrollTop > (innerHeight * 0.9)){
    //   console.log('scrolllimit')

    //   setCurrentChunk(currentChunk + 25)
    // }

  }

  useEffect(() => {
    document.getElementById('grid').addEventListener('scroll', handleScroll);
  }, [lastScrollTop ]);



  // This filters by color
  const filteredCommanders= ()=>{
    const sourceList = (searchResult && searchResult.length > 0 ) ? searchResult: allWpCard.edges;
    // generate list of all "related" cards
    const getRelatedList = ()=>{
      let relatedList = sourceList.filter(({node})=>{ 

        if(node.cdhCards.related || node.cdhCards.reverseRelated ){
          if(node.cdhCards.reverseRelated){
            // console.log('REVERSE SET == ', node.cdhCards.reverseRelated)

            return node.cdhCards.reverseRelated
          }else{
            return node.cdhCards.related 
          }
          
        } 


      });



      relatedList = relatedList.map(({node})=>{
        // console.log('RELATED ',node)
        if(node.cdhCards.related ){
          return node.cdhCards.related;
        }else {
          return node.cdhCards.reverseRelated
        }
        
      } );
  
      let finalList = [];
      relatedList.forEach(name => {
        allWpCard.edges.forEach(({node}) => {
          if(node.cdhCards.name === name){
            finalList.push(name)
          }
        })
      });      

      console.log('finalList',finalList);

      return finalList;
    }

    const relatedList = getRelatedList();
    // console.log('rdxtfyghiujo')
    // searchQuery
    
    let newList = sourceList.map(({node})=>{

      let flipCard = false;
      // create flip card obj if card is part of the list of related cards
      if((node.cdhCards.related && relatedList.includes(node.cdhCards.related)) || (node.cdhCards.reverseRelated && relatedList.includes(node.cdhCards.reverseRelated)) ){

        let card2 = sourceList.filter((subnode)=>{
          // console.log('norm', subnode)

          if(subnode && subnode.node.cdhCards.name === node.cdhCards.related){
            return subnode
          }else if(subnode && subnode.node.cdhCards.name === node.cdhCards.reverseRelated){
            return subnode
          }
        })
        
        if(card2[0]){
          flipCard = {
            flipCard: true,
            card1: node,
            card2: card2[0].node
          }
        }
        
      }
      // converts color identity to appropriate format
      const isEqual = (a, b) =>{ 
        let A =  a ? a.replace(/[0-9]/g, '') : a;
        if(A){
          return( A.split('').sort().join('').trim() === b.split('').sort().join('').trim() )
        }else{
          return(false)
        }
      };

      const finalReturn = ()=>{
        // checking if card is part of a flip card
        if(flipCard && (node.cdhCards.name === flipCard.card1.cdhCards.name || node.cdhCards.name === flipCard.card2.cdhCards.name)){
          // console.log(flipCard.card1.cdhCards.name)
          return flipCard;
        }else{
          return node;
        }
      }

      if(approvedFilter){
        if(colorFilter && colorFilter.length > 0 ){
          // does the node pass the colour filter?
          if(isEqual(node.cdhCards.prop.coloridentity, colorFilter)){
            return finalReturn();
          }
        }else {
          return finalReturn();
        }
      }else{
        if(node.cdhCards.status === 'Approved'){
          if(colorFilter && colorFilter.length > 0 ){
            // does the node pass the colour filter?
            if(isEqual(node.cdhCards.prop.coloridentity, colorFilter)){
              return finalReturn();
            }
          }else {
            return finalReturn();
          }
        }
        
      }

      
      
    });
    newList = newList.filter(function (el) {
      // removed null items
      const notNull = el != null;
      // remove duplicate flip parings
      let frontSideFirst = true;
      if(el && el.flipCard ){
        // console.log('EL', el)
        if(el.card1.cdhCards.prop.side !== "front"){
          frontSideFirst = false;
        }
      }

      let pass = notNull && frontSideFirst;
      return pass;
    });


    // set order by muid
    newList = descAsc ? newList : newList.reverse();
    // (newList/maxCards)
    // setMaxCards(100)

    // if(maxCardsChunks !== (newList/maxCards)){
      // console.log('here')
      // setMaxCardsChunks(newList/maxCards)
    // }

    console.log(newList)

    return (newList)
  }

  const flattenedList = allWpCard.edges.map(({node})=>{
    const flatObj = {
      name: node.cdhCards.name,
      muid: node.cdhCards.set.muid,
      coloridentity: node.cdhCards.prop.coloridentity
    };
    return flatObj;
  });

  const searchOptions = {
    includeScore: true,
    minMatchCharLength: 3,
    threshold: 0.45,
    keys: ['name']
  }

  const fuse = new Fuse(flattenedList, searchOptions);

  // setCommanderList(filteredCommanders())

  // const commanderList = filteredCommanders();

  
  // const commanderList = []
  return (
    <Container className={classes.container} >
      <Card className={classes.toolbar} >
        <Grid 
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          id="back-to-top-anchor"

        >
          <Grid container xs={12} md={3} justify="center" className={classes.mobileSpacer}>
            <form className={classes.searchbar} noValidate autoComplete="off">
              <TextField 
                id="standard-basic" 
                name="search"
                label="Search Commanders" 
                placeholder='"Kard, The Seeking"'
                onChange={handleSearch}
                InputProps={{
                  startAdornment: <SearchIcon></SearchIcon>,
                }}
                InputLabelProps={{
                  focused: 'true',

                }}
                variant="outlined"
              />
            </form>
          </Grid>
          <Grid container xs={12} md={6} justify="center" className={classes.mobileSpacer} >
            <Grid item xs={8} md={12}>
              <ColorSelector data={{ setColorFilter: setColorFilter }}  ></ColorSelector>
            </Grid>
              
          </Grid>
          
          <Grid container xs={12} md={3} justify="space-around" className={classes.mobileSpacer}>
            <ButtonGroup disableElevation variant="contained" >
              <Button onClick={()=>setDescAsc(!descAsc)}>{descAscDisplay}</Button>
              <Button onClick={()=>setApprovedFilter(!approvedFilter)}>{approvedFilter ? 'Approved Only': 'Approved & Beta'}</Button>

              {/* <Button onClick={()=>setAlphabetical(!alphabetical)}>{alphabeticalDisplay}</Button> */}
            </ButtonGroup>
          </Grid>

        </Grid>
        {colorFilter && (
          <Grid container xs={12} justify='center' alignItems='center' className={classes.colorBarInner} >
            {colorFilter.split("").map((color, colorIndex)=>(
              <Grid item style={{width: `${100/colorFilter.length}%`}} className={`${classes[`color_${color}`]} ${classes.colorInner}`}></Grid>
            ))}

          </Grid>
        )}

      </Card>

      <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.vertSpace}
      >
        <div>showing {approvedFilter ? `all ${filteredCommanders().length}` : 'only approved'}  {colorFilter ? `${colorToWords(colorFilter)}` : '' } commanders from {descAsc ? 'newest to oldest' : 'oldest to newest'} {searchQuery && searchQuery.length > 2? `named "${searchQuery}"`: ``}</div>
      </Grid>
      
      {filteredCommanders().length > 0 && (
        <Grid container className={classes.grid} id="grid">
          

          {filteredCommanders().map(( card, index) => {
            if(index < currentChunk){
              return (
                <Grid container key={index} xs={12} sm={6} md={3} justify='center' alignItems='center' id={`card_${index}`}>
      
                  <Link href={card.flipCard ? convertToSlug(card.card1.title) : convertToSlug(card.title)}>
                    <CommanderCard card={card}/>
                  </Link>
                  
                </Grid>
              )
            }
          })}

          {currentChunk < filteredCommanders().length &&(
            <Grid item xs={12} justify='center' alignItems='center' className={classes.loadmore} style={{ height: 'auto' }}> 
              <Button variant="contained" size="large" className={classes.loadmoreBtn} onClick={()=>setCurrentChunk(currentChunk + 100)}>Load More</Button>
            </Grid>
          )}
        </Grid>
      )} 
      <div className={classes.goUp}>
        <IconButton onClick={backToTop} variant="contained" className={classes.goUpBtn}> 
          <KeyboardArrowUpIcon fontSize="large"></KeyboardArrowUpIcon> 
        </IconButton>
      </div>


      {colorFilter && (
        <Grid container xs={12} justify='center' alignItems='center' className={classes.colorBar} >
          {colorFilter.split("").map((color, colorIndex)=>(
            <Grid item style={{width: `${100/colorFilter.length}%`}} className={`${classes[`color_${color}`]} ${classes.colorInner}`}></Grid>
          ))}

        </Grid>
      )}
      





      
    </Container>
  );
};

export default withStyles(styles)(CommanderList);
