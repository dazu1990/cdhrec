import React, {useState, useEffect}  from 'react';
import Fuse from 'fuse.js'
import { withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Grid, GridList, GridListTile, GridListTileBar ,FormControlLabel, Checkbox, Container, TextField, ButtonGroup, Button, Link, IconButton, Card } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';

import useCommanders from '../../utils/useCommanders';

import styles from './style';

type Props = {
    classes: Object,
  };
  
  const UploadList = ({ classes }: Props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const { allWpCard } = useCommanders();
  
    const [expandMenu,setExpandMenu] = useState(false);
  
  
    const convertToSlug = (Text) =>{
      if(Text){
        return Text
          .toLowerCase()
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'-')
          ;
      }
      
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
      }
      
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
      minMatchCharLength: 1,
      threshold: 0.15,
      keys: ['name']
    }
  
    const fuse = new Fuse(flattenedList, searchOptions);

    const submitList = (form) => {
      console.log(form);
    }

    const filteredCommanders= ()=>{
      let sourceList = []
      // Set the source list based on search results, random, or standard
      if (searchResult && searchResult.length > 0 ) {
        sourceList = searchResult;
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
      console.log('we here, ', newList)
      return (newList)
    }
  
    const renderBarContent = (scrollmenu)=>(<>
      <form noValidate autoComplete="off" onSubmit={submitList}>
        <Grid 
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >     
          <Grid item direction="column" className={classes.mobileSpacer}>
            <Autocomplete
              id="commander-select"
              options={flattenedList}
              getOptionLabel={(c) => c.name}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Commander"
                  placeholder="Kard, The Seeking"
                />
              )}
            />
            <Autocomplete 
              id="partner-select" 
              name="search"
              label="Partner (optional)" 
              placeholder='"Kard, The Seeking"'
              options={flattenedList}
              getOptionLabel={(c) => c.name}
              style={{ width: 300 }}
              renderInput={(params) => 
                <TextField {
                  ...params} 
                  label="Partner (optional)" 
                  variant="outlined" 
                />
              }
            />            
          </Grid>
          <Grid item direction="column" className={classes.mobileSpacer}>
            <TextareaAutosize
              id="deck-list"
              className={classes.deckInput} 
              name="deck"
              label="Deck List" 
              placeholder=''
              rowsMin={50}
              InputLabelProps={{
                focused: 'true',
                width: '500px',
                height: '800px',
              }}
              variant="outlined"
            />
            <input type="button" onClick={submitList} value="Submit" />
          </Grid>
      </Grid>
    </form>
    </>)
  

    return (
      <Container className={classes.container} >
        <Card className={classes.toolbar}>
          {renderBarContent(false)}
        </Card>
        
      </Container>
    );
  };
  
  export default withStyles(styles)(UploadList);