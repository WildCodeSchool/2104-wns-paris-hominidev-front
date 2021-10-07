import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createUIStore } from "redux-webext";

// import { browser } from 'webextension-polyfill-ts';

import App from './pages/app';

async function initPopup() {
  const store = await createUIStore();
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
    document.getElementById('root'),
  );
}

initPopup();
