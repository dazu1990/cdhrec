import React from 'react';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

import { ListItemAvatar, Avatar, Grid, Container, Accordion, AccordionSummary, AccordionDetails,List,ListItem, ListItemText, Divider, ButtonGroup, Button, InputBase, Link, IconButton, Card } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



import content from './content';

import usePosts from '../../utils/usePosts';


const { title, subtitle, links, body } = content;

const About = () => {
  const { allWpPost } = usePosts();

  const faqs = ()=>{
    let faqs = allWpPost.edges.filter(({node})=>node.categories.nodes[0].name==='faq');
    return faqs;
  }


  
  return(
    <Container>
      <Grid container>
        <Grid item xs={12} justify='center' alignItems='center' >
          <h1>
            About
          </h1>
          <Grid item xs={12} sm={6} justify='center' alignItems='center' >
            <p>
              {body}
            </p>

          </Grid>
          
        </Grid>
        <Grid item md={6} style={{padding: '0px 10px 0px 0px'}}>
          <h2>
            FAQs
          </h2>
          {faqs().map(({node})=>(
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{node.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography dangerouslySetInnerHTML={{__html: node.content }}>
              </Typography>
            </AccordionDetails>
          </Accordion>
          ))}
        </Grid>
        <Grid item md={6} style={{padding: '0px 0px 0px 10px'}}>
          <h2>
            {content.resources.header}
          </h2>
          {/* // className={classes.inline} */}

          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {content.resources.links.map((resource)=>(
              <Link href={resource.link} target="_blank">
                <ListItem alignItems="flex-start" button style={{backgroundColor: 'white', border: '1px solid lightgray', marginBottom: '10px'}}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={resource.logo} style={{backgroundColor: resource.color}}/>
                </ListItemAvatar>

                <ListItemText
                  primary={resource.name}
                  secondary={
                    <React.Fragment>
                      <div style={{color: 'grey', marginTop: '0.5rem',fontSize: '0.8rem'}}>
                        {resource.tagline}
                      </div>
                        
                      
                    </React.Fragment>
                    }
                />
                </ListItem>
              </Link>
              
            ))}
          </List>
            
        </Grid>

      </Grid>
    

    </Container>
  )
};

export default About;
