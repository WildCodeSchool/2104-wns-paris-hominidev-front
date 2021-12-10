/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { browser } from 'webextension-polyfill-ts';
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { decrementBackgroundCounter, incrementBackgroundCounter } from '../../compFct/actions';
import store from './compFct/store';
import { COMMENTS_SUBSCRIPTION2 } from '../../compFct/requests';

console.info('----------------------------------------------');
console.info('Background is starting...');
console.info('----------------------------------------------');

const httpLink = new HttpLink({
  uri: 'https://staging.pygma.link/server/graphql',
});

const wsLink = new SubscriptionClient('wss://staging.pygma.link/server/graphql', {
  reconnect: true,
  lazy: true,
  connectionParams: {
    authToken: store.getState().loginToken,
  },
});

wsLink.onConnecting(() => {
  console.info('Server connexion is starting...');
  console.info('----------------------------------------------');
});
wsLink.onConnected(() => {
  console.info('Server connexion is live!');
  console.info('----------------------------------------------');
});
wsLink.onDisconnected(() => {
  console.info('Server connexion is down!');
  console.info('----------------------------------------------');
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
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
});

// query
apolloClient
  .subscribe({
    query: COMMENTS_SUBSCRIPTION2,
    variables: { newRoomMessageRoomId2: 777 },
  })
  .subscribe({
    next(data) {
      // eslint-disable-next-line no-underscore-dangle
      console.log(data.data.newRoomMessage.__typename, ':', data.data.newRoomMessage.message);
    },
    error(err) {
      console.error('err', err);
    },
  });

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
