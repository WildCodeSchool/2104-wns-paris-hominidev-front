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
  
  // Redux Test
  // increment or decrement background counter every second
  setInterval(() => {
      store.dispatch(Math.random() >= 0.5 ?
      incrementBackgroundCounter() :
      decrementBackgroundCounter()
      );
      console.log("background:",store.getState());
    }, 1000);
    
start();

// PeerJs command to sen and receive data
/*
const conn = peerServer.connect('dest-peer-id');
peer.on('connection', function(conn) { ... });
*/