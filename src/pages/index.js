import React from 'react';

import { Layout, SEO, Footer} from 'components';
import { Welcome, CommanderList } from 'containers';

const IndexPage = () => {
  
  return (
  <Layout>
    <SEO title='CDHrec'/>
    <Welcome />
    <CommanderList/>
    <Footer />
  </Layout>
)};

export default IndexPage;
