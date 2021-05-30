import logo from '../asset/logo.png';
import Login from './popup.login';
import StudentDashboard from './popup.studentDashboard';

type PopupProps = {
   online: boolean;
   handleSubmit: (e: any) => void;
};

const Popup = ({ online, handleSubmit }: PopupProps) => {
   return (
      <div className="App">
         <img src={logo} className="App-logo" alt="logo" />
         <h1> Connection !</h1>
         {!online ? (
            <Login handleSubmit={handleSubmit} />
         ) : (
            <StudentDashboard />
         )}
      </div>
   );
};

export default Popup;
