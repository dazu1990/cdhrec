import React, {useState, useEffect}  from 'react';
import { withStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Grid, FormControlLabel, Container, TextField, ButtonGroup, Button, Link, IconButton, Card, Typography } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'

import useCommanders from '../../utils/useCommanders';
import { CommanderCard } from 'components';

import styles from './style';

type Props = {
    classes: Object,
  };
  
  const UploadList = ({ classes }: Props) => {
    // Initialize the state variables
    const[commanderSelected, setCommander] = useState({});
    const[partnerSelected, setPartner] = useState({});
    const[deckList, setDeck] = useState("");

    // A collection of all the commanders in the cdh xml
    const { allWpCard } = useCommanders();

    // All the commanders flatened into an object used by the auto complete
    const flattenedList = allWpCard.edges.map(({node})=>{
      const flatObj = {
        name: node.cdhCards.name,
        muid: node.cdhCards.set.muid,
        coloridentity: node.cdhCards.prop.coloridentity,
        featuredImage: node.featuredImage ? node.featuredImage : node.cdhCards.set.picurl,
        flipCard: node.flipCard,
        cdhCards: node.cdhCards,
      };
      return flatObj;
    });

    // Handle submitting the deck
    const submitList = () => {
      console.log(commanderSelected);
      console.log(partnerSelected);
      console.log(deckList);
      const localData = localStorage.getItem('apiCdhRec', {});
      let cmdr = commanderSelected.name;
      if (partnerSelected.name) {
        cmdr = `${commanderSelected.name}//${partnerSelected.name}`
      }
      axios.put('http://api.cdhrec.com/wp-json/acf/v3/decks', {
        headers: {
          'Authorization': localData.token,
        },
        data: {
          title: 'TODO',
          commmander: cmdr,
          decklist: deckList,
          author: localData.user_nicename,
        }
      })
      .then(response => {
        console.log('response data', response.data)
      });
    };
  
    const renderRecForm = ()=>(<>
      <form noValidate autoComplete="off" onSubmit={submitList}>
        <Grid 
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >     
          <Grid item direction="column" className={classes.mobileSpacerFlex}>
            {commanderSelected.name && (
              <CommanderCard card={commanderSelected}/>
            )}
            <Autocomplete
              className={classes.cardSelect}
              id="commander-select"
              name="commander-select"
              options={flattenedList}
              getOptionLabel={(c) => c.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="commander"
                  name="commander"
                  variant="outlined"
                  label="Select Commander"
                  placeholder="Kard, The Seeking"
                />
              )}
              onChange={(event, val)=>setCommander(val)}
            />
            <Autocomplete
              className={classes.cardSelect}
              id="partner-select" 
              name="partner-select"
              label="Partner (optional)" 
              placeholder='"Kard, The Seeking"'
              options={flattenedList}
              getOptionLabel={(c) => c.name}
              renderInput={(params) => 
                <TextField
                  {...params}
                  id="partner" 
                  label="Partner (optional)" 
                  variant="outlined" 
                />
              }
              onChange={(event, val)=>setPartner(val)}
            />
            <Typography className={classes.reminderText}>
              List must contain 100 cards (1 commander and 99 cards OR 2 commanders and 98 cards)<br/><br/>
              Accceptable formats:<br/>
              1x Counterspell<br/>
              1 Counterspell<br/>
              Counterspell<br/><br/>
              Don't forget your lands!
            </Typography>        
          </Grid>
          <Grid item direction="column" className={classes.mobileSpacerFlex}>
            <TextareaAutosize
              className={classes.deckInput} 
              id="deck-list"
              name="deck-list"
              label="Deck List" 
              placeholder=''
              rowsMin={50}
              InputLabelProps={{
                focused: 'true',
                width: '500px',
                height: '800px',
              }}
              variant="outlined"
              onChange={(event)=>setDeck(event.target.value)}
            />
            <input type="button" className={classes.btn} onClick={submitList} value="Submit" />
          </Grid>
      </Grid>
    </form>
    </>)
  

    return (
      <Container className={classes.container} >
        <Card className={classes.toolbar}>
          <Typography variant='h1' className={classes.uploadTitle} color='textPrimary'>
            Upload a deck list Reccomendation
          </Typography>
          {renderRecForm()}
        </Card>
        
      </Container>
    );
  };
  
  export default withStyles(styles)(UploadList);