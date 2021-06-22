import { FC } from 'react';
import logo from '../../asset/logo.png';
import './styles/layout.css';

const PopupLayout: FC = ({ children }) => {
   return (
      <div className="layoutMain">
         <div className="container">
            <div className="logo">
               <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="childrenContainer">{children}</div>
         </div>
      </div>
   );
};
export default PopupLayout;
