import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import Fade from '@material-ui/core/Fade';
import {Card, Grid, Container, Avatar, SvgIcon, Link, Button} from '@material-ui/core';

// import HelpIcon from '@material-ui/icons/Help';
import GetAppIcon from '@material-ui/icons/GetApp';
// import HelpOutlineIcon from '@material-ui/icons/HelpOutline';



// import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';


import { Animated } from 'components';

import content from './content';
import styles from './style';

// type Props = {
//   classes: Object
// };

const {  title, subtitle, xmlcard, discordcard } = content;

const Welcome = ({classes}) => (
  <>
  <Container style={{ padding: 0 }} >
    <Grid container >
      <Grid item xs={12} md={6} style={{ padding: 20 }}>
        <Fade in timeout={1000}>
            <>
              <Typography variant='h1' className={classes.maintitle} color='textPrimary'>
                  {title}
              </Typography>
              <br></br>
              <Grid item xs={12} md={8}>
                <Typography variant='subtitle1' className={classes.tagline} color='textPrimary'>
                  {subtitle}
                </Typography>
              </Grid>
            </>
        </Fade>
      </Grid>
      <Grid item  xs={12} md={6} style={{ padding: 10 }}>
        <Fade in timeout={1000}>
        {/* style={{ padding: 10, height: '100%' }} */}
                <Grid container style={{ height: '100%' }}>
                  <Grid item  xs={6} style={{ padding: 10, height: '100%'  }}>

                    <Card style={{ height: '100%' }}>
                        
                        <Grid container style={{ height: '100%', padding: '10px 20px' }} justify='center' alignItems='center'>
                          
                          <Avatar className={classes.icon}>
                            <GetAppIcon className={classes.icon_inner}></GetAppIcon>
                          </Avatar>

                          <Typography variant='body1' color='textPrimary' className={classes.cardcopy}>
                            {xmlcard.copy}
                          </Typography>
                          <Link href={xmlcard.link} target="_blank" download>

                            <Button variant='outlined'>{xmlcard.cta}</Button>
                          </Link>

                        </Grid>
                    </Card>
                    
                  </Grid>
                  <Grid item  xs={6} style={{ padding: 10, height: '100%'  }}>
                    {/* <Link href="https://mtg.design/" > */}
                      

                    
                    <Card style={{ height: '100%' }}>
                      {/* <CardActionArea style={{ height: '100%' }}> */}
                        
                        <Grid container style={{ height: '100%', padding: 10 }} justify='center' alignItems='center'>
                          
                          {/* <Avatar className={classes.icon}> */}
                            <SvgIcon className={classes.icon}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245 240"><path d="M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z"/><path d="M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z"/></svg>
                            </SvgIcon>
                          {/* </Avatar> */}

                          <Typography variant='body1' color='textPrimary' className={classes.cardcopy}>
                            {discordcard.copy}
                          </Typography>
                          <Link href={discordcard.link} target="_blank">
                            <Button variant='outlined'>{discordcard.cta}</Button>
                          </Link>
                        </Grid>
                      {/* </CardActionArea> */}
                    </Card>
                      
                    {/* </Link> */}
                      

                    
                  </Grid>
                  {/* <Grid item  xs={4} style={{ padding: 5, height: '100%'  }}>
                      

                    
                    <Card style={{ height: '100%' }}>
                      <CardActionArea style={{ height: '100%' }}>
                        
                        <Grid container style={{ height: '100%', padding: 10 }} justify='center' alignItems='center'>
                          
                          <Avatar className={classes.icon}>
                            <GetAppIcon className={classes.icon_inner}></GetAppIcon>
                          </Avatar>
                          <br></br>
                          <Typography variant='body1' color='textPrimary'>
                            Here's an XML file with all commanders and tokens!
                          </Typography>
                          <Button variant='outlined'>FAQ</Button>

                        </Grid>
                      </CardActionArea>
                    </Card>
                      
                      

                    
                  </Grid> */}
                </Grid>
        </Fade>
      </Grid>

    </Grid>

  </Container>
    
    
    
    
    

  </>
);

export default withStyles(styles)(Welcome);
