import { useState } from 'react';
import logo from './asset/logo.png';
import Popup from './component/popup';
import './App.css';

function App(): JSX.Element {
   const extensionOrigin = `chrome-extension://${chrome.runtime.id}`;
   const [online, setOnline] = useState(false);
   const handleSubmit = (e: any) => {
      if (e.key === 'Enter') {
         setOnline(true);
      }
   };

   return <Popup online={online} handleSubmit={handleSubmit} />;
}
export default App;
