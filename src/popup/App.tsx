import { useState } from 'react';
import Popup from './component/popup';
import Register from './component/popup.register';
import './App.css';

function App(): JSX.Element {
   const extensionOrigin = `chrome-extension://${chrome.runtime.id}`;
   const [online, setOnline] = useState(false);
   const [register, setRegister] = useState(false);
   const handleSubmit = (e: any) => {
      if (e.key === 'Enter') {
         setOnline(true);
      }
   };
   const handleRegisterSubmit = (e: any) => {
      if (e.key === 'Enter') {
         setRegister(true);
      }
   };

   return (
      <>
         {!register ? (
            <Register handleRegisterSubmit={handleRegisterSubmit} />
         ) : (
            <Popup online={online} handleSubmit={handleSubmit} />
         )}
      </>
   );
}
export default App;
