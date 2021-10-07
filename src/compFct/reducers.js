import {combineReducers} from 'redux';

import {
    DECREMENT_BACKGROUND_COUNTER,
    DECREMENT_UI_COUNTER,
    INCREMENT_BACKGROUND_COUNTER,
    INCREMENT_UI_COUNTER,
    LOGIN,
    LOGOUT,
} from './constants';

function createCounterReducer(increment, decrement) {
    return ( state = 100, action ) => {
        const value = action.value || 1;
        console.log('here', action )
        switch (action.type) {
            case increment:
                return state + value;
            case decrement:
                return state - value;
            default:
                return state;
        }
    };
}

function createLoginReducer(login, logout) {
    return ( state = '', action ) => {
        switch (action.type) {
            case login:
                return action.value;
            case logout:
                localStorage.setItem('token', '');
                console.log('OUT !')
                return '';
            default:
                return state;
        }
    };
}

export default combineReducers({
    backgroundCounter: createCounterReducer(INCREMENT_BACKGROUND_COUNTER, DECREMENT_BACKGROUND_COUNTER),
    uiCounter: createCounterReducer(INCREMENT_UI_COUNTER, DECREMENT_UI_COUNTER),
    loginToken: createLoginReducer(LOGIN, LOGOUT)
});