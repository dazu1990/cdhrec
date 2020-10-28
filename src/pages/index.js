import React from 'react';

import { Layout, SEO } from 'components';
import { Welcome, CommanderList } from 'containers';

const IndexPage = () => (
  <Layout>
    <SEO title='Home' />
    <Welcome />
    <CommanderList/>
  </Layout>
);

export default IndexPage;
