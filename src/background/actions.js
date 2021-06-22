import { conn } from 'peerjs';

import {
    DECREMENT_BACKGROUND_COUNTER,
    DECREMENT_UI_COUNTER,
    INCREMENT_BACKGROUND_COUNTER,
    INCREMENT_UI_COUNTER,
} from '../constants';

export function incrementBackgroundCounter() {
    return {type: INCREMENT_BACKGROUND_COUNTER};
}

export function decrementBackgroundCounter() {
    return {type: DECREMENT_BACKGROUND_COUNTER};
}

export function incrementUICounter({value}) {
    return {
        type: INCREMENT_UI_COUNTER,
        value
    };
}

export function decrementUICounter({value}) {
    return {
        type: DECREMENT_UI_COUNTER,
        value
    };
}

export function sendMsg({value}) {
    conn.on('open', () => {
        // Receive messages
        conn.on('data', (data) => {
          console.log('Received', data);
        });
      
        // Send messages
        conn.send(value);
      });
}
