/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { browser } from 'webextension-polyfill-ts';
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { MESSAGE_SUBSCRIPTION, POST_MESSAGE } from '../../compFct/requests';

if (!localStorage.getItem('tabList')) {localStorage.setItem('tabList', JSON.stringify({}))};

console.info('----------------------------------------------');
console.info('Background is starting...');
console.info('----------------------------------------------');

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  //uri: 'https://staging.pygma.link/server/graphql',
  headers : {authorization: localStorage.getItem('token') !== ('' || null) && localStorage.getItem('token'),},
});

//const wsLink = new SubscriptionClient('wss://staging.pygma.link/server/graphql', {
const wsLink = new SubscriptionClient('ws://localhost:4000/graphql', {
  reconnect: true,
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
    let type, tab, url, group, data;
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
          break

        case 'PAGELOAD':
          var gettingActive = browser.tabs.query({
            currentWindow: true, active: true
          });
          gettingActive.then(connectToTab, onError);
             
          function connectToTab(tabs) {
            if (tabs.length > 0) {
              console.log(tabs[0])
              localStorage.setItem(
                'tabList',
                JSON.stringify({
                  ...JSON.parse(localStorage.getItem('tabList')),
                 [tabs[0].url]: {id:url=tabs[0].id, groupId: localStorage.getItem('groupId')}
                })
              )
            }
          }
          
          function onError(error) {
            console.log(`Error: ${error}`);
          }
        case 'DRAW':
          apolloClient.mutate({
            mutation: POST_MESSAGE,
            variables: {
              type: message.type,
              group: 'test',
              data: JSON.stringify(message.data)
            },
          }) 
          break

        default:
          console.log("MESSAGE",message);
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
    variables: {/* groupID : 'test' */},
  })
  .subscribe({
    next(data) {
      // eslint-disable-next-line no-underscore-dangle
      console.log('RECEIVED', data);


    },
    error(err) {
      console.error('err', err);
    },
  });
