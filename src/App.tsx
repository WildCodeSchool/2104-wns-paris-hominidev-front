import './App.css';
// eslint-disable-next-line import/no-named-as-default
import SnailMenu from './overlay/SnailMenu';

function App(): JSX.Element {
  const extensionOrigin = `chrome-extension://${chrome.runtime.id}`;

  return (
    <div className='App'>
      <SnailMenu path={extensionOrigin} />
    </div>
  );
}

export default App;
