import logo from '../assets/logo/logo_picto.svg';
import './App.css';

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <img alt="logo" className="App-logo" src={logo} />
      <p>
         Modify <code>src/App.tsx</code>  in dashboard and save to reload!
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        rel="noopener noreferrer"
        target="_blank"
      >
        Learn React ah ah
      </a>
    </header>
  </div>
);

export default App;