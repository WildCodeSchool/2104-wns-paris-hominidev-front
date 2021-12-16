import React from 'react';
import ReactDOM from 'react-dom';

// import { browser } from 'webextension-polyfill-ts';

import App from './pages/app';

async function initPopup() {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  );
}

initPopup();
