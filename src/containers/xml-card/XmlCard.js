import React, {useState}  from 'react';
import { withStyles } from '@material-ui/styles';
import { Grid, Container, TextField, ButtonGroup, Button, Card, CircularProgress, Select, MenuItem, InputLabel, Typography } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'
import useCommanders from '../../utils/useCommanders';
import usePartnerCommanders from '../../utils/partnerCommanders';
// import {
//   useQuery,
//   // gql
// } from '@apollo/client';
// import gql from 'graphql-tag';
// import { graphql } from 'gatsby'
import useSingleCard from '../../utils/useSingleCard';

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
  const[commanderId, setCommanderId] = useState(1);
  const cardData = useSingleCard(commanderId);
  const[isLoading, setLoading] = useState(cardData.loading);
  // A collection of all the commanders in the cdh xml
  const { allWpCard } = useCommanders();
  const partnerHelper = usePartnerCommanders();
  // When testing partner combos, uncomment below
  // const allWpCard = partnerHelper.getAllPartners();

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
  
  // const[status, setStatus] = useState('Playtest');
  // const[side, setSide] = useState('Front');
  let cleanCommander = {
    imageUrl: 'https://cdn.discordapp.com/attachments/690041911620534298/859220708177739786/Salamander.png',
    name: '',
    mainType: '',
    type: '',
    manaCost: '',
    cmc: '',
    cardColors: '',
    colorId: '',
    pt: '',
    loyalty: '',
    text: '',
    side: 'front',
    status: 'Playtest',
    related: '',
    muid: '',
    num: '',
    rarity: '',
    uuid: '',
    token: false,
    reverseRelated: '',
  }
  
  if (!cardData.loading && cardData.data.cards.edges[0]) {
    const c = cardData.data.cards.edges[0].node.cdhCards;
    const mainTypeString = c.prop.mainType ? c.prop.mainType.toString(' ') : 'Creature';
    
    console.log("response post massage", c);
    // Massage that data because Dang son.
    cleanCommander = {
      imageUrl: c.set.picurl,
      name: c.name,
      mainType: mainTypeString,
      type: c.prop.type,
      manaCost: c.prop.manacost,
      cmc: c.prop.cmc,
      cardColors: c.prop.colors,
      colorId: c.prop.coloridentity,
      pt: c.prop.pt,
      loyalty: c.prop.loyalty,
      text: c.text,
      side: c.prop.side.toLowerCase(),
      status: c.status === 'Approved' ? c.status : 'Playtest',
      related: c.related,
      muid: c.set.muid,
      num: c.set.num,
      rarity: c.set.rarity,
      uuid: c.set.uuid,
      token: c.token,
      reverseRelated: c.reverseRelated,
    }
  } 

  // We need to have each param broken out to see state changes, object changes don't count. Thanks zucker.
  const[imageUrl, setImageUrl] = useState(cleanCommander.imageUrl);
  const[name, setName] = useState(cleanCommander.name);
  const[text, setText] = useState(cleanCommander.name);
  const[mainType, setMainType] = useState(cleanCommander.mainType);
  const[type, setType] = useState(cleanCommander.type);
  const[manaCost, setManaCost] = useState(cleanCommander.manaCost);
  const[cmc, setCmc] = useState(cleanCommander.cmc);
  const[cardColors, setCardColors] = useState(cleanCommander.cardColors);
  const[colorId, setColorId] = useState(cleanCommander.colorId);
  const[pt, setPt] = useState(cleanCommander.pt);
  const[loyalty, setLoyalty] = useState(cleanCommander.loyalty);
  const[side, setSide] = useState(cleanCommander.side);
  const[status, setStatus] = useState(cleanCommander.status);
  const[related, setRelated] = useState(cleanCommander.related);
  const[muid, setMuid] = useState(cleanCommander.muid);
  const[num, setNum] = useState(cleanCommander.num);
  const[rarity, setRarity] = useState(cleanCommander.rarity);
  const[uuid, setUuid] = useState(cleanCommander.uuid);
  const[token, setToken] = useState(cleanCommander.token);
  const[reverseRelated, setReverseRelated] = useState(cleanCommander.reverseRelated);

  

  const loadCommander = () => {
    console.log('were here', cardData);
    const c = cardData.data.cards.edges[0].node.cdhCards;
    console.log("response post massage", c);
    // Massage that data because Dang son.
    const mainTypeString = c.prop.mainType ? c.prop.mainType.toString(' ') : 'Creature';
    // Massage that data because Dang son.
    cleanCommander = {
      imageUrl: c.set.picurl,
      name: c.name,
      mainType: mainTypeString,
      type: c.prop.type,
      manaCost: c.prop.manacost,
      cmc: c.prop.cmc,
      cardColors: c.prop.colors,
      colorId: c.prop.coloridentity,
      pt: c.prop.pt,
      loyalty: c.prop.loyalty,
      text: c.text,
      side: c.prop.side.toLowerCase(),
      status: c.status === 'Approved' ? c.status : 'Playtest',
      related: c.related,
      muid: c.set.muid,
      num: c.set.num,
      rarity: c.set.rarity,
      uuid: c.set.uuid,
      token: c.token,
      reverseRelated: c.reverseRelated,
    }
    setImageUrl(cleanCommander.imageUrl);
    setName(cleanCommander.name);
    setText(cleanCommander.text);
    setMainType(cleanCommander.mainType);
    setType(cleanCommander.type);
    setManaCost(cleanCommander.manaCost);
    setCmc(cleanCommander.cmc);
    setCardColors(cleanCommander.cardColors);
    setColorId(cleanCommander.colorId);
    setLoyalty(cleanCommander.loyalty);
    setSide(cleanCommander.side);
    setStatus(cleanCommander.status);
    setRelated(cleanCommander.related);
    setMuid(cleanCommander.muid);
    setNum(cleanCommander.num);
    setRarity(cleanCommander.rarity);
    setUuid(cleanCommander.uuid);
    setToken(cleanCommander.token);
    setToken(cleanCommander.token);
    setReverseRelated(cleanCommander.reverseRelated);
  }

  const clearForm = () => {
    cleanCommander = {
      imageUrl: 'https://cdn.discordapp.com/attachments/690041911620534298/859220708177739786/Salamander.png',
      name: '',
      mainType: '',
      type: '',
      manaCost: '',
      cmc: '',
      cardColors: '',
      colorId: '',
      pt: '',
      loyalty: '',
      text: '',
      side: 'front',
      status: 'Playtest',
      related: '',
      muid: '',
      num: '',
      rarity: '',
      uuid: '',
      token: false,
      reverseRelated: '',
    }
    setImageUrl(cleanCommander.imageUrl);
    setName(cleanCommander.name);
    setText(cleanCommander.text);
    setMainType(cleanCommander.mainType);
    setType(cleanCommander.type);
    setManaCost(cleanCommander.manaCost);
    setCmc(cleanCommander.cmc);
    setCardColors(cleanCommander.cardColors);
    setColorId(cleanCommander.colorId);
    setPt(cleanCommander.pt);
    setLoyalty(cleanCommander.loyalty);
    setSide(cleanCommander.side);
    setStatus(cleanCommander.status);
    setRelated(cleanCommander.related);
    setMuid(cleanCommander.muid);
    setNum(cleanCommander.num);
    setRarity(cleanCommander.rarity);
    setUuid(cleanCommander.uuid);
    setToken(cleanCommander.token);
    setToken(cleanCommander.token);
    setReverseRelated(cleanCommander.reverseRelated);
  }

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

  const renderXml = ()=>{    

    const copyContent = ()=>{
      let copyText = document.getElementById("codeBlock");
      // copyText.focus();
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");
    }
    
  //   const reverseLine = reverseRelated ? `
  // <reverse-related>${reverseRelated}</reverse-related>` : '';
    let relatedLine = '';
    if (related) {
      let lines = [];
      const relatedArray = related.split(';');
      relatedArray.forEach(rt => lines.push(`
  <related>${rt}</related>`));
      relatedLine = lines.join('');
    }
    let reverseLine = '';
    if (reverseRelated) {
      let lines = [];
      const reverseArray = reverseRelated.split(';');
      reverseArray.forEach(rt => lines.push(`
  <reverse-related>${rt}</reverse-related>`));
      reverseLine = lines.join('');
    }
    let ptOrLoyal = ''
    if (pt) {
      ptOrLoyal = `<pt>${pt}</pt>`;
    } else if (loyalty) {
      ptOrLoyal =  `<loyalty>${loyalty}</loyalty>`;
    }
    
  //   const relatedLine = related ? `
  // <related>${related}</related>` : '';
    const statusLine = status === 'Approved' ? `
  <status>${status}</status>` : ''

    let xmlCode = `<card>
  <name>${name}</name>
  <text><![CDATA[${text}]]></text>
  <tablerow>2</tablerow>
  <set rarity="${rarity}" uuid="${uuid}" num="${num}" muid="${muid}" picurl="${imageUrl}">CDH</set> ${relatedLine} ${reverseLine}
  <prop>
    <layout>normal</layout>
    <side>${side}</side>
    <type>${type}</type>
    <maintype>${mainType}</maintype>
    <manacost>${manaCost}</manacost>
    <cmc>${cmc}</cmc>
    <colors>${cardColors}</colors>
    <coloridentity>${colorId}</coloridentity>
    ${ptOrLoyal}
    <format-commander>legal</format-commander>
  </prop> ${statusLine}
</card>`

return(  
  <div>
    <Button  onClick={()=>{copyContent()}}>COPY XML</Button>
    <textarea 
    className={classes.invisible} 
    id="codeBlock"             
    value={`${xmlCode}`}></textarea>

  <pre className={classes.codeBlock} >
    <code >
      {xmlCode}
    </code>
  </pre>
</div>
)
}




  const renderRecForm = ()=>(<>
    <div className={classes.xmlParent}>
      <div className={classes.imageSection}>
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
            onChange={(event, val)=>setCommanderId(val.postId)}
        />
        <div className={classes.buttons}>
          <Button 
            className={classes.btn}
            onClick={loadCommander}
          >
            Load Commander
          </Button>
          <Button 
            className={classes.btn}
            onClick={clearForm}
          >
            Clear
          </Button>
        </div>
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
            id="picurl"
            label="Image URL"
            value={imageUrl}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setImageUrl(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="name"
            label="Name"
            value={name}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setName(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="rarity"
            label="Rarity"
            value={rarity}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setRarity(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="uuid"
            label="Uuid"
            value={uuid}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setUuid(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="num"
            label="Num"
            value={num}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setNum(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="muid"
            label="Muid"
            value={muid}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setMuid(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="mainType"
            label="Main Type"
            value={mainType}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setMainType(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="type"
            label="Type"
            value={type}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setType(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="manaCost"
            label="Mana Cost"
            value={manaCost}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setManaCost(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="cmc"
            label="CMC"
            value={cmc}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setCmc(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="cardColors"
            label="Card Colors"
            value={cardColors}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setCardColors(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            required
            id="colorId"
            label="Color Identity"
            value={colorId}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setColorId(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            id="pt"
            label="Power/Toughness"
            value={pt}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setPt(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            id="loyalty"
            label="Loyalty"
            value={loyalty}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setLoyalty(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            id="related"
            label="Related"
            value={related}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setRelated(event.target.value)}
          />
          <TextField
            className={classes.inputField}
            id="reverseRelated"
            label="Reverse Related"
            value={reverseRelated}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event)=>setReverseRelated(event.target.value)}
          />
          <TextareaAutosize
            className={classes.cardTextInput}
            required
            id="text"
            label="Text"
            placeholder="Text"
            value={text}
            rowsMin={10}
            inputlabelprops={{
              width: '600px',
              height: '250px',
            }}
            variant="outlined"
            onChange={(event)=>setText(event.target.value)}
          />
          <div>
            <InputLabel id="sideLabel" className={classes.inputLabel}>Side</InputLabel>
            <Select
              className={classes.inputField}
              id="side"
              defaultValue={side}
              label="sideLabel"
              value={side}
              onChange={(event)=>setSide(event.target.value)}
            >
              <MenuItem value={"front"}>Front</MenuItem>
              <MenuItem value={"Back"}>Back</MenuItem>
            </Select>
            <InputLabel id="statusLabel" className={classes.inputLabel}>Status</InputLabel>
            <Select
              className={classes.inputField}
              id="status"
              defaultValue={status}
              label="statusLabel"
              value={status}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event)=>setStatus(event.target.value)}
            >
              <MenuItem value={"Playtest"}>Playtest</MenuItem>
              <MenuItem value={"Approved"}>Approved</MenuItem>
            </Select>
          </div>
        </form>
      </div>
    </div>
    {renderXml()}
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