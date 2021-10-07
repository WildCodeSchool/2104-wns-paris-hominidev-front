//@ts-nocheck


import { useState } from 'react';

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';
import PopupLayout from '../compUi/popup.layout';
import Popup from './popup';

function App(): JSX.Element {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return (
    <ApolloProvider client={client}>
      <PopupLayout>
        <Popup />
      </PopupLayout>
    </ApolloProvider>
  );
}
export default App;
