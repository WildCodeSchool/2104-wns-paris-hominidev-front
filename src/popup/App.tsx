import logo from './logo.svg';
import './App.css';

function App(): JSX.Element {
   const extensionOrigin = `chrome-extension://${chrome.runtime.id}`;

   return (
      <div className="App">
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Welcome to popup</p>
            <p>
               Edit <code>src/popup/App.js</code> and save to reload.
            </p>
            <span
               className="App-link"
               data-target="_blank"
               data-rel="noopener noreferrer"
            >
               Learn React TOTO
            </span>
            <button
               type="button"
               onClick={() =>
                  chrome.tabs.create({ url: `${extensionOrigin}/index.html` })
               }
            >
               Aller à l&apos;admin
            </button>
         </header>
      </div>
   );
}

export default App;

chrome.browserAction.onClicked.addListener(function (activeTab) {
   const newURL = 'http://stackoverflow.com/';
   chrome.tabs.create({ url: newURL });
});
