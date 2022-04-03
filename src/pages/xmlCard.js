import React from 'react';

import { Layout, SEO, Footer} from 'components';
import { XmlCard } from 'containers';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.cdhrec.com/index.php?graphql',
  cache: new InMemoryCache()
});

const XmlCardContainer = () => {
  
  return (
  <Layout>
    <SEO title='CDHrec'/>
    <ApolloProvider client={client}>
    <XmlCard/>
    </ApolloProvider>
    <Footer />
  </Layout>
)};

export default XmlCardContainer;
