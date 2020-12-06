import React from 'react';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import {Divider} from '@material-ui/core';


import { Animated } from 'components';

import content from './content';

const { tagline, title, subtitle } = content;

const Welcome = () => (
  <>

    <Fade in timeout={1000}>
      <Typography variant='h1' color='textPrimary'>
        {title}
      </Typography>
    </Fade>
    <strong>{subtitle}</strong>
    <Typography variant='subtitle2' color='textPrimary'>
    {subtitle}
    </Typography>
    <Divider></Divider>

  </>
);

export default Welcome;
