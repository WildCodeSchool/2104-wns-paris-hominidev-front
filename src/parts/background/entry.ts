// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { browser } from 'webextension-polyfill-ts';
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import axios from 'axios';
import { decrementBackgroundCounter, incrementBackgroundCounter } from '../../compFct/actions';
import store from './compFct/store';
import { COMMENTS_SUBSCRIPTION2 } from '../../compFct/requests';

console.info('----------------------------------------------');
console.info('Background is starting...');
console.info('----------------------------------------------');

axios({
  url: 'https://staging.pygma.link/server/graphql',
  method: 'post',
  data: {
    query: `
      query PostsForAuthor {
        author(id: 1) {
          firstName
            posts {
              title
              votes
            }
          }
        }
      `,
  },
}).then((result) => {
  console.log(result.data);
});

/* const httpLink = new HttpLink({
  uri: 'https://staging.pygma.link/server/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'wss://staging.pygma.link/server/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: store.getState().loginToken,
    },
  },
});
 */
// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
/* const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
}); */

// query
/* async function CommentsPageWithData() {
  return apolloClient.subscribe({
    query: COMMENTS_SUBSCRIPTION2,
    variables: { roomID: 777 },
    next(data) {
      console.log('data', data);
    },
    error(err) {
      console.error('err', err);
    },
  });
} */

// CommentsPageWithData();
/* const link = new WebSocketLink({
  // url: 'wss://staging.pygma.link/server/graphql',
  uri: 'https://localhost:4000/graphql',
  options: {
    reconnect: true,
  }, */
/*   connectionParams: () => {
    const sessionToken = store.getState().loginToken;
    if (!sessionToken) {
      return {};
    }
    return {
      Authorization: `${sessionToken}`,
    };
  }, */
// });

/* try {
  const result = link.request({ query: COMMENTS_SUBSCRIPTION2 });
  console.log('result', result);
} catch (err) {
  console.error(err);
}

// eslint-disable-next-line func-names
browser.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(async (message) => {
    console.log(message);

    port.postMessage({
      greeting: `reply from background script, got os`,
    });
  });
});
 */
setInterval(() => {
  // TEMP TEST increment or decrement background counter every second
  store.dispatch(Math.random() >= 0.5 ? incrementBackgroundCounter() : decrementBackgroundCounter());

  // Monitor JWT token availability in local storage to set it in redux store
  if (localStorage.getItem('token') !== ('' || null) && store.getState().loginToken === '') {
    store.getState().loginToken = localStorage.getItem('token');
    store.getState().id = localStorage.getItem('ownId');
  }
}, 1000);
