import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
   ApolloClient,
   ApolloProvider,
   HttpLink,
   InMemoryCache,
} from '@apollo/client';
import App from './component/App';

const client = new ApolloClient({
   uri: 'http://localhost:4000/',
   link: HttpLink,
   cache: new InMemoryCache(),
});
ReactDOM.render(
   <ApolloProvider client={client}>
      <App />
   </ApolloProvider>,
   document.getElementById('root'),
);
