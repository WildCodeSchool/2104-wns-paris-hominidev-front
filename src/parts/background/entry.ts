/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { browser } from 'webextension-polyfill-ts';
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { MESSAGE_SUBSCRIPTION, POST_MESSAGE } from '../../compFct/requests';

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
    authToken: localStorage.getItem('token') !== ('' || null) && localStorage.getItem('token'),
  },
});

wsLink.onConnecting(() => {
  console.info('Server connexion is starting...');
  console.info('----------------------------------------------');
});
wsLink.onConnected(() => {
  console.info('Server connexion is live!');
  console.info('----------------------------------------------');
  browser.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(async (message) => {
      //console.log(message.payload && message.payload[2]);
      switch(message.type) {
        case 'ISAUTH':
          port.postMessage({
            type: 'ISAUTH',
            tabs: '',
            url: '',
            group:'',
            data: { state : localStorage.getItem('token')?.length > 0  ? true : false}
          })
          break;
        //case 'PAGELOAD':

      default:
        /*  apolloClient.query({
           query: POST_MESSAGE,
           variables: data,
         }) */
      }
    });
  });
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
    query: MESSAGE_SUBSCRIPTION,
    variables: { roomId: 777 },
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
