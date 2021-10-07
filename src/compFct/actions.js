import { conn } from 'peerjs';

import {
    DECREMENT_BACKGROUND_COUNTER,
    DECREMENT_UI_COUNTER,
    INCREMENT_BACKGROUND_COUNTER,
    INCREMENT_UI_COUNTER,
    LOGIN,
    LOGOUT,
} from './constants';

export function incrementBackgroundCounter() {
    return {type: INCREMENT_BACKGROUND_COUNTER};
}

export function decrementBackgroundCounter() {
    return {type: DECREMENT_BACKGROUND_COUNTER};
}

export function incrementUICounter({value = 1}) {
    return {
        type: INCREMENT_UI_COUNTER,
        value
    };
}

export function decrementUICounter({value = 1}) {
    return {
        type: DECREMENT_UI_COUNTER,
        value
    };
}

export function login(token) {
    return {
        type: LOGIN,
        value: token
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}