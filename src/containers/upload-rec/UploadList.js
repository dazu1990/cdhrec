import React, {useState}  from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Container, TextField, ButtonGroup, Button, Card, CircularProgress, Typography } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'

import useCommanders from '../../utils/useCommanders';
import usePartnerCommanders from '../../utils/partnerCommanders';
import { CommanderCard } from 'components';

import styles from './style';
import ConfirmationBox from '../../components/dialogs';

const UploadList = (Props) => {
  // get authentication token. You can use the token to now POST to http://api.cdhrec.com/wp-json/wp/v2/decks &  http://api.cdhrec.com/wp-json/acf/v3/decks/[your deck id]
  const apiAuth = typeof window !== 'undefined' ? JSON.parse(global.sessionStorage.getItem('apiCdhRec')) : false;

  const classes = Props.classes;

  // Initialize the state variables
  const[commanderSelected, setCommander] = useState({});
  const[partnerSelected, setPartner] = useState({});
  const[deckList, setDeck] = useState("");
  const[decktitle, setTitle] = useState("");
  const[dialogShow, setDialogShow] = useState(false);
  const[dialogText, setDialogText] = useState({});
  const[dialogIcon, setDialogIcon] = useState({});
  const[isLoading, setLoading] = useState(false);

  // A collection of all the commanders in the cdh xml
  const { allWpCard } = useCommanders();
  const partnerHelper = usePartnerCommanders();

  // All the commanders flatened into an object used by the auto complete
  const flattenedList = allWpCard.edges.map(({node})=>{
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

  const formattedDeckList = () => {
    const formatted = [];
    const deckItems = deckList.split('\n');
    // Start counting at 1 if we have a partner
    let count = partnerSelected.postId ? 1 : 0;
    deckItems.forEach((lineItem) => {
      // Validate the line item. Do we want a regex thing or do we want to assign it a thing?
      let splitItem = lineItem.split(' ');
      let cleanedFirst = parseInt(splitItem[0], 10);
      // Check the first segment
      if (cleanedFirst) {
        formatted.push({
          number: cleanedFirst,
          cardname: lineItem.replace(`${splitItem[0]} `, ''),
        });
        count += cleanedFirst;
      } else {
        // If there is no number at the beginning of the line time, assume 1
        formatted.push({
          number: 1,
          cardname: lineItem,
        });
        count++;
      }
    });

    return [formatted, count];
  };

  // Handle submitting the deck
  const submitList = async () => {
    setLoading(true);
    const cmdr = commanderSelected.postId;
    const [fDeck, cardCount] = formattedDeckList();

    if (!cmdr) {
      setDialogText({
        message: "Who will lead this deck?",
        title: "Commander required",
      });
      setDialogIcon("error");
      setDialogShow(true);
      setLoading(false);
      return;
    }
    
    // If a partner is selected, make sure that the cmd is the relevant partner
    if (partnerSelected.postId) {
      const counterpart = partnerHelper.getPartner(commanderSelected.name);
      console.log(counterpart)
      if (counterpart === undefined) {
        setDialogText({
          message: "This Commander does not have a legal partner",
          title: "Not a Partner",
        });
        setDialogIcon("error");
        setDialogShow(true);
        setLoading(false);
        return;
      } else if (counterpart.muid !== partnerSelected.muid) {
        setDialogText({
          message: "These two do not partner together",
          title: "Partners Do Not Match",
        });
        setDialogIcon("error");
        setDialogShow(true);
        setLoading(false);
        return;
      }
    }
    
    // Make sure we have the right amount of cards 
    if (cardCount !== 99) {
      setDialogText({
        message: "EDH decks need 100 cards",
        title: "100 Cards required",
      });
      setDialogIcon("error");
      setDialogShow(true);
      setLoading(false);
      return;
    }

    // If the user did not set a deckTitle, add one
    if (!decktitle.length) {
      const currentDate = new Date();
      setTitle(`${commanderSelected.name} Deck ${currentDate.toDateString()}`);
    }

    const postBody = JSON.stringify({
      "title": decktitle,
      "status": "publish"
    })

    // Create the deck and save the ID for later
    const deckIdResp = await axios.post(
      'http://api.cdhrec.com/wp-json/wp/v2/decks', 
      postBody, 
      {
        headers: {
          'Authorization': `Bearer ${apiAuth.token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let bodyData = {
      fields: {
        title: decktitle,
        commander: cmdr,
        author: 'some person',
        decklist: fDeck
      }
    };

    try {
      await axios.post(`http://api.cdhrec.com/wp-json/acf/v3/decks/${deckIdResp.data.id}`, JSON.stringify(bodyData), 
        {headers: {
          'Authorization': `Bearer ${apiAuth.token}`,
          'Content-Type': 'application/json'}
        })
      .then(response => {
        // Success!
        if (response.status === 200) { 
          setDialogText({
            message: "Thanks for the reccomendation!",
            title: "Success!",
          });
          setDialogIcon("success");
          setDialogShow(true);
          setLoading(false);
          return;
        } else {
          // request succeeded but response was not a 200
          setDialogText({
            message: `Please try again later or post in #website-is-broke. Error ${response.status}`,
            title: "Something went wrong!",
          });
          setDialogIcon("error");
          setDialogShow(true);
          setLoading(false);
          return;
        }
      });     
    } catch (e) {
      // generic unknown error
      setDialogText({
        message: "Please try again later or post in #website-is-broke",
        title: "Something went wrong!",
      });
      setDialogIcon("error");
      setDialogShow(true);
      setLoading(false);
      return;
    }
  }


  const renderRecForm = ()=>(<>
    <form noValidate autoComplete="off" onSubmit={submitList}>
      <Grid 
        container
        direction="row"
      >     
        <Grid container direction="column" className={classes.mobileSpacerFlex} xs={12} md={6}>
          {commanderSelected.name && (
            <CommanderCard card={commanderSelected}/>
          )}
          <Autocomplete
            className={classes.cardSelect}
            id="commander-select"
            name="commander-select"
            disableClearable={true}
            options={flattenedList}
            getOptionLabel={(c) => c.name}
            getOptionSelected={(option, value) => option.id === value.id}
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
            disableClearable={true}
            options={partnerHelper.flattenedList()}
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
        <Grid container direction="column" className={classes.mobileSpacerFlex} xs={12} md={6}>
          <TextField 
            className={classes.deckTitle}
            name="title"
            label="Deck Title" 
            placeholder='"Visin and the Bird Gang"'
            onChange={(event)=>setTitle(event.target.value)}
            variant="outlined"
          />
          <TextareaAutosize
            className={classes.deckInput} 
            id="deck-list"
            name="deck-list"
            label="Deck List" 
            placeholder=''
            rowsMin={50}
            inputlabelprops={{
              focused: true,
              width: '500px',
              height: '800px',
            }}
            variant="outlined"
            onChange={(event)=>setDeck(event.target.value)}
          />
          <ButtonGroup disableElevation>
            <Button 
              className={classes.btn}
              onClick={submitList}
            >
              {isLoading ? <CircularProgress /> : "Submit"}
            </Button>
          </ButtonGroup>
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
      <ConfirmationBox
        dialogText={dialogText}
        icon={dialogIcon}
        open={dialogShow}
        updateParent={setDialogShow}
      />  
    </Container>
  );
};
  
export default withStyles(styles)(UploadList);