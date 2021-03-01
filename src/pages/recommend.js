import React from 'react';

import { Layout, SEO, Footer} from 'components';
import { UploadList } from 'containers';

const UploadRecommend = () => {
  
  return (
  <Layout>
    <SEO title='CDHrec'/>
    <UploadList/>
    <Footer />
  </Layout>
)};

export default UploadRecommend;
