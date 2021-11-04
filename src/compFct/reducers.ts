import { AnyAction, combineReducers } from 'redux';

import { DECREMENT_BACKGROUND_COUNTER, DECREMENT_UI_COUNTER, INCREMENT_BACKGROUND_COUNTER, INCREMENT_UI_COUNTER, LOGIN, LOGOUT } from './constants';

const createCounterReducer = (increment: string, decrement: string) => {
  return (state = 100, action: AnyAction) => {
    const value = action.value || 1;
    switch (action.type) {
      case increment:
        return state + value;
      case decrement:
        return state - value;
      default:
        return state;
    }
  };
};

const createLoginReducer = (login: string, logout: string) => {
  return (state = '', action: AnyAction) => {
    switch (action.type) {
      case login:
        return action.value;
      case logout:
        localStorage.setItem('token', '');
        return '';
      default:
        return state;
    }
  };
};

export default combineReducers({
  backgroundCounter: createCounterReducer(INCREMENT_BACKGROUND_COUNTER, DECREMENT_BACKGROUND_COUNTER),
  uiCounter: createCounterReducer(INCREMENT_UI_COUNTER, DECREMENT_UI_COUNTER),
  loginToken: createLoginReducer(LOGIN, LOGOUT),
});
