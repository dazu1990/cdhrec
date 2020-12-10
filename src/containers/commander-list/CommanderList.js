import React, {useState, useEffect}  from 'react';
import Fuse from 'fuse.js'
import { withStyles } from '@material-ui/styles';
import { Grid, Container, TextField, ButtonGroup, Button, Divider, InputBase, IconButton, Card } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SearchIcon from '@material-ui/icons/Search';



// import { CommanderCard } from '../../components';
import { CommanderCard } from 'components';
import { BlogPost } from 'components';



import useCommanders from './useCommanders';
import ColorSelector from './ColorSelector/ColorSelector';


import styles from './style';

type Props = {
  classes: Object,
};

const CommanderList = ({ classes }: Props) => {
  
  const[colorFilter,setColorFilter] = useState("");

  const[descAsc,setDescAsc] = useState(1);
  const[alphabetical,setAlphabetical] = useState(1);

  const descAscDisplay = !descAsc ? `new > old` : `old > new`;
  const alphabeticalDisplay = !alphabetical ? `A > Z` : `Z > A`;
  // const activeOrder = ()=>{
  //   if(descAsc && )
  // }


  const [searchQuery, setSearchQuery] = useState("");
  const[searchResult,setSearchResult] = useState([]);
  const { allWpCard } = useCommanders();


  const handleSearch = (event)=>{
    if(event.target.value.length > 2){
      setSearchQuery(event.target.value)
      let results = fuse.search(searchQuery);
      results = results.map(({item})=>{
        let fullcard = allWpCard.edges.find(obj => obj.node.cdhCards.set.muid === item.muid);
        return(fullcard)
      });

      setSearchResult(results)
    }else if (event.target.value.length === 0){
      setSearchResult("")
    }

    // event.preventDefault();

    
  }

  const backToTop = (event)=>{
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  

  // This filters by color
  const filteredCommanders= ()=>{

    let sourceList = (searchResult && searchResult.length > 0 ) ? searchResult: allWpCard.edges;

    const getRelatedList = ()=>{
      let relatedList = sourceList.filter(({node})=>{ 
        if(node.cdhCards.related){
          return node.cdhCards.related
        }
      });
      relatedList = relatedList.map(({node})=>node.cdhCards.related);
  
      let finalList = [];
      relatedList.forEach(name => {
        sourceList.forEach(({node}) => {
          if(node.cdhCards.name === name){
            finalList.push(name)
          }
        })
      });      
      return finalList;
    }

    const relatedList = getRelatedList();
    // searchQuery
    
    let newList = sourceList.map(({node})=>{

      let flipCard = false;
      // create flip card obj if card is part of the list of related cards
      if(node.cdhCards.related && relatedList.includes(node.cdhCards.related) ){
        flipCard = {
          flipCard: true,
          card1: node,
          card2: sourceList.filter((subnode)=>{
            // console.log(subnode)
            if(subnode.node.cdhCards.name === node.cdhCards.related){
              return subnode
            }
          })[0].node
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

      if(colorFilter && colorFilter.length > 0 ){
        // does the node pass the colour filter?
        if(isEqual(node.cdhCards.prop.coloridentity, colorFilter)){
          return finalReturn();
        }
      }else {
        return finalReturn();
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


  return (
    <Container className={classes.container} >
      <Card style={{ padding: 10 }}>
        <Grid 
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          id="back-to-top-anchor"
        >
          <Grid item>
            <form className={classes.searchbar} noValidate autoComplete="off">
              <TextField 
                id="standard-basic" 
                name="search"
                label="Search Commanders" 
                placeholder="Commander Name"
                onChange={handleSearch}
                InputProps={{
                  startAdornment: <SearchIcon></SearchIcon>,
                }}
                variant="outlined"
              />
            </form>
          </Grid>
          
          <Grid item>
            <ColorSelector data={{ setColorFilter: setColorFilter }}  ></ColorSelector>
          </Grid>
          
          <Grid item>
            <ButtonGroup disableElevation variant="contained" >
              <Button onClick={()=>setDescAsc(!descAsc)}>{descAscDisplay}</Button>
              {/* <Button onClick={()=>setAlphabetical(!alphabetical)}>{alphabeticalDisplay}</Button> */}
            </ButtonGroup>
            
          </Grid>
        </Grid>

      </Card>

      <Grid 
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.vertSpace}
      >
        <div>showing {filteredCommanders().length} commanders from {descAsc ? 'new to old' : 'old to new'} {searchQuery && searchQuery.length > 2? `named "${searchQuery}"`: ``} out of a total {flattenedList.length}</div>
      </Grid>
      
      {filteredCommanders().length > 0 && (
        <Grid container spacing={1} className={classes.grid}>
        {filteredCommanders().map(( card, index) => (
          <Grid key={index} container item xs={12} sm={6} md={3} >
            <CommanderCard card={card}/>
          </Grid>
        ))}

      </Grid>
      )}
      

      <div className={classes.goUp}>
          <IconButton onClick={backToTop} variant="contained" className={classes.goUpBtn}> 
            <KeyboardArrowUpIcon fontSize="large"></KeyboardArrowUpIcon> 
          </IconButton>
      </div>
    </Container>
  );
};

export default withStyles(styles)(CommanderList);
