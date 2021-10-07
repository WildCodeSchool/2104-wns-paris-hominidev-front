import axios from "axios";
import Peer from "peerjs";

import {decrementBackgroundCounter, incrementBackgroundCounter} from './actions';
import store from './store';

let peerServer;

async function start() {
    try {
      // Ask server for an idea
      const response:any = await axios.get('http://127.0.0.1:9000/pygmalink/id');
 
      // Connect to the peerServer
      peerServer = new Peer(response.data, {
        host: 'localhost',
        port: 9000,
        secure:false,
        key:"pygmalink"
    });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
  
  setInterval(() => {
      // TEMP TEST increment or decrement background counter every second
      store.dispatch(Math.random() >= 0.5 ?
      incrementBackgroundCounter() :
      decrementBackgroundCounter()
      );

      // Monitor JWT token availability in local storage to set it in redux store
      if (localStorage.getItem('token') !== ('' || null) && store.getState()['loginToken'] === '') {
        store.getState()['loginToken'] = localStorage.getItem('token');
      }
    }, 1000);
    
start();

// PeerJs command to sen and receive data
/*
const conn = peerServer.connect('dest-peer-id');
peer.on('connection', function(conn) { ... });
*/