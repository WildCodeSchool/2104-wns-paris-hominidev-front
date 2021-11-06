import { AnyAction } from 'redux';
import { DECREMENT_BACKGROUND_COUNTER, DECREMENT_UI_COUNTER, INCREMENT_BACKGROUND_COUNTER, INCREMENT_UI_COUNTER, LOGIN, LOGOUT } from './constants';

export const incrementBackgroundCounter = (): Record<string, unknown> => {
  return { type: INCREMENT_BACKGROUND_COUNTER };
};

export const decrementBackgroundCounter = (): Record<string, unknown> => {
  return { type: DECREMENT_BACKGROUND_COUNTER };
};

export const incrementUICounter = (): { type: string; value: number } => {
  return {
    type: INCREMENT_UI_COUNTER,
    value: 1,
  };
};

export const decrementUICounter = (): { type: string; value: number } => {
  return {
    type: DECREMENT_UI_COUNTER,
    value: 1,
  };
};

export const login = (
  token: string,
): {
  type: string;
  value: string;
} => {
  return {
    type: LOGIN,
    value: token,
  };
};

export function logout(): Record<string, unknown> {
  return {
    type: LOGOUT,
  };
}
