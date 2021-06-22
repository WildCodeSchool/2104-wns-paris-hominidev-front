import {createStore} from 'redux';
import {createBackgroundStore} from 'redux-webext';

import {decrementUICounter, incrementUICounter} from './actions';
import reducer from './reducers';

const store = createStore(reducer);

console.log('store',store.getState());

export default createBackgroundStore({
    store,
    actions: {
        INCREMENT_UI_COUNTER: incrementUICounter,
        DECREMENT_UI_COUNTER: decrementUICounter,
    }
});
