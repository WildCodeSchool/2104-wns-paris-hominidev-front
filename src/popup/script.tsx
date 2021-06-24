import React from 'react';
import ReactDOM from 'react-dom';

// import { browser } from 'webextension-polyfill-ts';

import App from './component/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

