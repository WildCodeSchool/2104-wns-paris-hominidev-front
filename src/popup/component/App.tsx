import { useState } from 'react';
import Popup from './pages/popup';
import Register from './pages/popup.register';
import PopupLayout from './pages/popup.layout';

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
         console.log(e);
         setRegister(true);
      }
   };

   return (
      <PopupLayout>
         {!register ? (
            <Register
               setRedirect={setRegister}
               handleRegisterSubmit={handleRegisterSubmit}
            />
         ) : (
            <Popup online={online} handleSubmit={handleSubmit} />
         )}
      </PopupLayout>
   );
}
export default App;
