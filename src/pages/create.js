import React from 'react';

import { Layout, SEO, Footer} from 'components';
import { XmlCard } from 'containers';

const XmlCardContainer = () => {
  
  return (
  <Layout>
    <SEO title='CDHrec'/>
    <XmlCard/>
    <Footer />
  </Layout>
)};

export default XmlCardContainer;
