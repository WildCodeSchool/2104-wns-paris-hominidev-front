import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

import FormerDashboard from './pages/former';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <FormerDashboard />
    </ApolloProvider>
  );
};

export default App;
