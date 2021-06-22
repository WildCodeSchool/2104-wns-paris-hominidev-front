import { browser } from 'webextension-polyfill-ts';

import logo from '../assets/logo/logo.svg';
import './App.scss';

function App(): JSX.Element {
  const extensionOrigin = browser.runtime.getURL('/dashboard.html');

  return (
    <div className="App">
      <header className="App-header">
        <img alt="logo" className="App-logo" src={logo} />
        <p>Welcome to pipo</p>
        <p>
          Prout <code>src/popup/App.js</code> and save to reload.ee
        </p>
        <span
          className="App-link"
          data-rel="noopener noreferrer"
          data-target="_blank"
        >
          Learn React TOTO
        </span>
        <button 
          onClick={() => {
            browser.tabs.create({ url: `${extensionOrigin}` });
          }}
          type="button"
        >
          Aller à l&apos;admin
        </button>
      </header>
    </div>
  );
}

export default App;
