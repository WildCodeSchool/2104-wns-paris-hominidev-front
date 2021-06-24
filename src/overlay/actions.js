import {DECREMENT_UI_COUNTER, INCREMENT_UI_COUNTER, SEND_MSG} from '../constants';

export function incrementUICounter() {
    return {
        type: INCREMENT_UI_COUNTER,
        value: 3
    };
}

export function decrementUICounter() {
    return {
        type: DECREMENT_UI_COUNTER,
        value: 3
    };
}

export function sendHello() {
    console.log('sendHello');
    return {
        type: SEND_MSG,
        value: 'hello'
    };
}
