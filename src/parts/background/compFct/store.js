import {createStore} from 'redux';
import {createBackgroundStore} from 'redux-webext';

import {decrementUICounter, incrementUICounter, login, logout} from '../../../compFct/actions';
import reducer from '../../../compFct/reducers';

const store = createStore(reducer);

export default createBackgroundStore({
    store,
    actions: {
        INCREMENT_UI_COUNTER: incrementUICounter,
        DECREMENT_UI_COUNTER: decrementUICounter,
        LOGIN: login,
        LOGOUT: logout,
    }
});
