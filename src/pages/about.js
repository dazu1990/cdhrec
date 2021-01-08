import React from 'react';

import { Layout, SEO, Footer } from 'components';
import { About } from 'containers';

const AboutPage = () => {

  return (
    <Layout>
      <SEO title='CDHrec | About' />
      <About />
      <Footer />
    </Layout>
  )
};

export default AboutPage;
