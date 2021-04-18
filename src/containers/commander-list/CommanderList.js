import React, {useState, useEffect}  from 'react';
import Fuse from 'fuse.js'
import { withStyles } from '@material-ui/styles';
import { Grid, FormControlLabel, Checkbox, Container, TextField, ButtonGroup, Button, Link, IconButton, Card } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SearchIcon from '@material-ui/icons/Search';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


// import Fab from '@material-ui/core/Fab';

// import Typography from '@material-ui/core/Typography';




// import { CommanderCard } from '../../components';
import { CommanderCard } from 'components';
// import { BlogPost } from 'components';



import useCommanders from '../../utils/useCommanders';
import ColorSelector from './ColorSelector/ColorSelector';


import styles from './style';

// type Props = {
//   classes: Object
// };

const CommanderList = ({ classes }) => {
  
  const[colorFilter,setColorFilter] = useState("");

  // const [lastScrollTop, setLastScrollTop] = useState(0);


  const[descAsc,setDescAsc] = useState(1);
  const[alphabetical,setAlphabetical] = useState(1);
  const[approvedFilter,setApprovedFilter] = useState(1);
  const[playtestingFilter,setPlaytestingFilter] = useState(1);

  const[randomizedCards,setRandomOrder] = useState([]);


  const descAscDisplay = !descAsc ? `new to old` : `old to new`;
  const alphabeticalDisplay = !alphabetical ? `A > Z` : `Z > A`;
  // const activeOrder = ()=>{
  //   if(descAsc && )
  // }


  const [searchQuery, setSearchQuery] = useState("");
  const[searchResult,setSearchResult] = useState([]);
  const { allWpCard } = useCommanders();
  // const[commanderList, setCommanderList] = useState(allWpCard.edges);

  const[expandMenu,setExpandMenu] = useState(false);


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
    let newString = '';

    const getWords = (innerColor)=>{
      let filter = Array.from(innerColor);
      filter.forEach((colorLetter,index) => {
        if(index !== 0){
          newString = newString + ', ';
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
    }

    if(inclusiveSearch){
      getWords(color)
    }else{
      getWords(color)
    }

    
    return newString;
  }


  const handleSearch = (event)=>{
    event.preventDefault();

    // setMaxCards(100)

    if(event.target.value.length > 0){
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
    
  }

  const backToTop = (event)=>{
    // const anchor = (event.target.ownerDocument || document ).querySelector('#back-to-top-anchor');
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', alignToTop: true , block: 'center'});
    }
    
    // const anchor = (event.target.ownerDocument || document ).querySelector('#gatsby-focus-wrapper');
    // // (event.target.ownerDocument || document ).querySelector('#back-to-top-anchor');
    // if (anchor) {
      // anchor.scrollIntoView();
    // }
    // window.scrollTo(0,0)
  }
  // let toggle = true;
  // const handleScroll = () => {

  //   const currentScrollTop = document.documentElement.scrollTop;

  //   console.log(currentScrollTop)


  // }
  // window.addEventListener('scroll', handleScroll);

  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const [inclusiveSearch, setInclusiveSearch] = useState(false);


  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);

      // console.log(scrolling, scrollTop)
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);


  // useEffect(() => {
  // }, []);

  // This filters by color
  const filteredCommanders= ()=>{
    let sourceList = []
    // Set the source list based on search results, random, or standard
    if (searchResult && searchResult.length > 0 ) {
      sourceList = searchResult;
    } else if (randomizedCards.length > 0) {
      sourceList = randomizedCards;
    } else {
      sourceList = allWpCard.edges
    }
    // generate list of all "related" cards
    const getRelatedList = ()=>{
      let relatedList = sourceList.filter(({node})=>{ 

        if(node.cdhCards.related || node.cdhCards.reverseRelated ){
          if(node.cdhCards.reverseRelated){
            return node.cdhCards.reverseRelated
          }else{
            return node.cdhCards.related 
          }
          
        } 


      });

      relatedList = relatedList.map(({node})=>{

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
      return finalList;
    }

    const relatedList = getRelatedList();
    
    let newList = sourceList.map(({node})=>{

      let flipCard = false;
      // create flip card obj if card is part of the list of related cards
      if((node.cdhCards.related && relatedList.includes(node.cdhCards.related)) || (node.cdhCards.reverseRelated && relatedList.includes(node.cdhCards.reverseRelated)) ){

        let card2 = sourceList.filter((subnode)=>{
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

      const getAllSubstrings = (colors) => {
        // colors must be === string.split('')

        var branches = [];
        if (colors.length === 1) return colors;
        for (var k in colors) {
          var color = colors[k];
          getAllSubstrings(colors.join('').replace(color, '').split('')).concat("").map(function(subtree) {
            branches.push([color].concat(subtree));
          });
        }
        return branches.map( (str) => str.join('') );
      };

      const finalReturn = (returnArray)=>{
        // checking if card is part of a flip card
        if(!returnArray){
          if(flipCard && (node.cdhCards.name === flipCard.card1.cdhCards.name || node.cdhCards.name === flipCard.card2.cdhCards.name)){
            return flipCard;
          }else{
            return node;
          }
        }else{
          return returnArray;
        }
        
      }

      const theColorFilter = ()=>{
        if(colorFilter && colorFilter.length > 0 ){
          // does the node pass the colour filter?
          if(inclusiveSearch){
            let subStrings = getAllSubstrings(colorFilter.split(''));
            if(colorFilter !== "C"){
              console.log(colorFilter)
              subStrings.push("C")
            }
            
            // console.log(subStrings)
            let returnArray = [];
            subStrings.forEach((substring)=>{
              // console.log('=>', substring, isEqual(node.cdhCards.prop.coloridentity, substring) )
              if(isEqual(node.cdhCards.prop.coloridentity, substring) ){
                // console.log('---', node.cdhCards.prop.coloridentity, substring)
                returnArray.push(finalReturn());
              }
            })
            return finalReturn(returnArray);
          }else{
            if(isEqual(node.cdhCards.prop.coloridentity, colorFilter)){
              return finalReturn();
            }
          }
          
        }else {
          return finalReturn();
        }
      }
      // console.log(approvedFilter, playtestingFilter)
      if((approvedFilter && playtestingFilter)){
 
        return theColorFilter();

      }else if(!approvedFilter && playtestingFilter){
        if(node.cdhCards.status !== 'Approved'){
          return theColorFilter();
        }
        
      }else if(approvedFilter && !playtestingFilter){
        if(node.cdhCards.status === 'Approved'){
          return theColorFilter();
        }
        
      }

      
      
    });
    newList = newList.flat().filter(function (el) {
      // removed null items
      const notNull = el != null;
      // remove duplicate flip parings
      let frontSideFirst = true;
      if(el && el.flipCard ){
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

      // setMaxCardsChunks(newList/maxCards)
    // }

    // console.log(newList)

    newList = newList.filter(function(el) {
      if (!this[el.id]) {
        this[el.id] = true;
        return true;
      }
      return false;
    }, Object.create(null));
    // console.log('newList = ',newList)

    return (newList)
  }

  const searchResultsText = () => {
    let approvedSec = `all ${filteredCommanders().length}`;

    if(approvedFilter && !playtestingFilter){
      approvedSec = 'only approved'
    }else if(!approvedFilter && playtestingFilter){
      approvedSec = 'only playtesting'
    }else if(!approvedFilter && !playtestingFilter){
      approvedSec = `no`
    }

    return(
      `showing ${approvedSec}  ${colorFilter ? `${colorToWords(colorFilter)}` : '' } commanders ${`${sortText()}`} ${searchQuery && searchQuery.length > 2? `named "${searchQuery}"`: ``}`
    )
  }

  const sortDescAsc = (val) => {
    // Before sorting, remove randomized list
    setRandomOrder([]);
    setDescAsc(val);
  }

  // Randomize cards
  const randomizeCards = () => {
    // Send in a copy of ALL cards
    return shuffleArray([...allWpCard.edges]);
  }

  const sortText = () => {
    if (randomizedCards.length) {
      return 'displayed randomly';
    }
    return `from ${descAsc ? 'newest to oldest' : 'oldest to newest'}`;
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    minMatchCharLength: 4,
    threshold: 0.15,
    keys: ['name']
  }

  const fuse = new Fuse(flattenedList, searchOptions);

  const renderBarContent = (scrollmenu)=>(<>
    <Grid 
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          // id="back-to-top-anchor"

        >
          <Grid container xs={12} md={3} justify="center" className={classes.mobileSpacer}>
            <form className={classes.searchbar} noValidate autoComplete="off" onSubmit={e => { e.preventDefault(); }}>
              <TextField 
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

          <Grid container xs={12} md={1} justify="center" alignItems='center' className={classes.mobileSpacer} >

          <FormControlLabel
            control={
                <Checkbox 
                  // icon={ <i className={`ms ms-c ${classes.unchecked}`}></i> } 
                  // checkedIcon={ <i className={`ms ms-c ms-cost`}></i> } 
                  name="filter by identity"
                  value={inclusiveSearch}
                  // color="black"
                  onChange={()=>setInclusiveSearch(!inclusiveSearch)}
                />
            }
            label="Inclusive search"
            // labelPlacement="bottom"
          />
          </Grid>


          <Grid container xs={12} md={5} justify="center" alignItems='center' className={classes.mobileSpacer} >

            <Grid item xs={scrollmenu ? 12 : 8} md={12}>

              <ColorSelector data={{ setColorFilter: setColorFilter }}  ></ColorSelector>
            </Grid>
              
          </Grid>
          
          <Grid container xs={12} md={3} justify="center" className={classes.mobileSpacer}>
            <Grid container xs={12} justify="center">
              <ButtonGroup disableElevation  >
                <Button className={classes.btn} onClick={()=>sortDescAsc(!descAsc)}>{descAscDisplay}</Button>
                <Button className={classes.btn} onClick={()=>setRandomOrder(randomizeCards())}><ShuffleIcon/></Button>
              </ButtonGroup>
            </Grid>
            <Grid container xs={12} justify="center">
              <ButtonGroup disableElevation  >
                <Button className={classes.btn} onClick={()=>setApprovedFilter(!approvedFilter)}>
                  {approvedFilter ? <VisibilityOffIcon/> : <VisibilityIcon/>} Approved
                </Button>
                <Button className={classes.btn} onClick={()=>setPlaytestingFilter(!playtestingFilter)}>
                  {playtestingFilter ? <VisibilityOffIcon/> : <VisibilityIcon/>} Playtesting
                </Button>
              </ButtonGroup>
            </Grid>
            
          </Grid>

          {scrollmenu && (
            <Grid container xs={12} md={3} justify="space-around" className={`${classes.menucollapse} ${classes.mobileSpacer}`}>
              <ButtonGroup disableElevation  >
                <Button onClick={()=>setExpandMenu(!expandMenu)}>{expandMenu ? 'close' : 'search | filter'}</Button>
              </ButtonGroup>
            </Grid>
          )}
        </Grid>
        {colorFilter && (
          <Grid container xs={12} justify='center' alignItems='center' className={classes.colorBarInner} >
            {colorFilter.split("").map((color, colorIndex)=>(
              <Grid item style={{width: `${100/colorFilter.length}%`}} className={`${classes[`color_${color}`]} ${classes.colorInner}`}></Grid>
            ))}
          </Grid>
        )}

  </>)

  // setCommanderList(filteredCommanders())

  // const commanderList = filteredCommanders();

  
  // const commanderList = []
  return (
    <Container className={classes.container} >
      <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={`${classes.mobileMenu} ${scrolling & scrollTop > 400? 'scrollDown' : ''} ${expandMenu ? 'expanded' : ''}`}
        >
        {renderBarContent(true)}
      </Grid>
      <Card className={classes.toolbar}>
        {renderBarContent(false)}

      </Card>

      <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.vertSpace}
      >
        
        <div>
          {searchResultsText()}
        </div>
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
            <Grid container item xs={12} justify='center' alignItems='center' className={classes.loadmore} style={{ height: 'auto' }}> 
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
