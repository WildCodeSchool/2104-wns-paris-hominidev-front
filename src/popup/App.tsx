import { useState } from 'react';
import logo from './asset/logo.png';
import './App.css';

function App(): JSX.Element {
   const extensionOrigin = `chrome-extension://${chrome.runtime.id}`;
   const [online, setOnline] = useState(false);
   const handleSubmit = (e: any) => {
      if (e.key === 'Enter') {
         setOnline(true);
      }
   };

   return (
      <div className="App">
         <img src={logo} className="App-logo" alt="logo" />
         {!online ? (
            <div data-testid="online" className="online">
               <form>
                  <label id="username" htmlFor="username">
                     Username
                     <br />
                     <input
                        type="text"
                        name="username"
                        placeholder="username"
                     />
                  </label>
                  <label id="password" htmlFor="password">
                     Password
                     <br />
                     <input
                        type="text"
                        name="password"
                        placeholder="password"
                        onKeyPress={handleSubmit}
                     />
                  </label>
               </form>
               <div className="offline"> ------ </div>
            </div>
         ) : (
            <div className="offline">
               <div className="mainStudent">
                  <p> avatar </p>
                  <p> mon profil </p>
                  <p> dashboard</p>
               </div>
               <div>
                  <div className="studentGroupe">
                     <div>
                        <p> Mes groupes </p>
                        <label id="groupe1" htmlFor=" groupe1">
                           <input type="checkbox" name="groupe1" />
                           Groupe 1
                        </label>
                     </div>
                     <div>
                        <label htmlFor="groupe2">
                           <input id="groupe2" name="groupe2" type="checkbox" />
                           Groupe 2
                        </label>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
export default App;
