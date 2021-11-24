import React, {useState}  from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Container, TextField, ButtonGroup, Button, Card, CircularProgress, Select, MenuItem, InputLabel, Typography } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'

import styles from './style';
import ConfirmationBox from '../../components/dialogs';

const XmlCard = (Props) => {
  // get authentication token. You can use the token to now POST to https://api.cdhrec.com/wp-json/wp/v2/decks &  https://api.cdhrec.com/wp-json/acf/v3/decks/[your deck id]
  const apiAuth = typeof window !== 'undefined' ? JSON.parse(global.sessionStorage.getItem('apiCdhRec')) : false;

  const classes = Props.classes;

  // Initialize the state variables
  const[dialogShow, setDialogShow] = useState(false);
  const[dialogText, setDialogText] = useState({});
  const[dialogIcon, setDialogIcon] = useState({});
  const[isLoading, setLoading] = useState(false);
  const[imageUrl, setImageUrl] = useState('https://cdn.discordapp.com/attachments/690041911620534298/859220708177739786/Salamander.png');
  const[status, setStatus] = useState('');

  // Handle submitting the deck
  const submitCard = async () => {
    setLoading(true);


    // const postBody = JSON.stringify({
    //   "title": currentTitle,
    //   "status": "publish"
    // })

    // // Create the deck and save the ID for later
    // const deckIdResp = await axios.post(
    //   'https://api.cdhrec.com/wp-json/wp/v2/decks', 
    //   postBody, 
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${apiAuth.token}`,
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // );

    // let bodyData = {
    //   fields: {
    //     title: currentTitle,
    //     commander: cmdr,
    //     partner: partnerSelected.postId || null,
    //     author: 'some person',
    //     decklist: fDeck
    //   }
    // };

    // try {
    //   await axios.post(`https://api.cdhrec.com/wp-json/acf/v3/decks/${deckIdResp.data.id}`, JSON.stringify(bodyData), 
    //     {headers: {
    //       'Authorization': `Bearer ${apiAuth.token}`,
    //       'Content-Type': 'application/json'}
    //     })
    //   .then(response => {
    //     // Success!
    //     if (response.status === 200) { 
    //       setDialogText({
    //         message: "Thanks for the reccomendation!",
    //         title: "Success!",
    //       });
    //       setDialogIcon("success");
    //       setDialogShow(true);
    //       setLoading(false);
    //       return;
    //     } else {
    //       // request succeeded but response was not a 200
    //       setDialogText({
    //         message: `Please try again later or post in #website-is-broke. Error ${response.status}`,
    //         title: "Something went wrong!",
    //       });
    //       setDialogIcon("error");
    //       setDialogShow(true);
    //       setLoading(false);
    //       return;
    //     }
    //   });     
    // } catch (e) {
    //   // generic unknown error
    //   setDialogText({
    //     message: "Please try again later or post in #website-is-broke",
    //     title: "Something went wrong!",
    //   });
    //   setDialogIcon("error");
    //   setDialogShow(true);
    //   setLoading(false);
    //   return;
    // }
  }


  const renderRecForm = ()=>(<>
    <div className={classes.xmlParent}>
      <div className={classes.imageSection}>
        {imageUrl && (
          <img
            alt="Commander Card Image"
            src={imageUrl}
            height="410"
            width="320"
          />
        )}
      </div>
      <div className={classes.formSection}>
        <form noValidate autoComplete="off" onSubmit={submitCard}>
          <TextField
            className={classes.inputField}
            required
            id="imageUrl"
            label="Image URL"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setImageUrl(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="cardName"
            label="Name"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setImageUrl(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="mainType"
            label="Main Type"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setImageUrl(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="cardSide"
            label="Main Type"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setImageUrl(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="manaCost"
            label="Main Type"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setImageUrl(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="cardColors"
            label="Main Type"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setImageUrl(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="colorId"
            label="Color Identity"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setImageUrl(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="pt"
            label="Power/Toughness"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setImageUrl(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="cardText"
            label="Text"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setImageUrl(event.target.value)}
          />

          <InputLabel id="statusLabel">Status</InputLabel>
          <Select
            className={classes.inputField}
            id="statusDropdown"
            label="statusLabel"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setStatus(event.target.value)}
          >
            <MenuItem value={"Playtest"}>Playtest</MenuItem>
            <MenuItem value={"Approved"}>Approved</MenuItem>
          </Select>
          
        </form>
      </div>
    </div>
    </>)


  return (
    <Container className={classes.container} >
      <Card className={classes.toolbar}>
        <Typography variant='h1' className={classes.uploadTitle} color='textPrimary'>
          XML Card
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
  
export default withStyles(styles)(XmlCard);