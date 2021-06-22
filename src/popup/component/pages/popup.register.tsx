import './styles/register.css';

export {};
type PopupRegisterProps = {
   handleRegisterSubmit: (e: any) => void;
   setRedirect: any;
};
const Register = ({
   setRedirect,
   handleRegisterSubmit,
}: PopupRegisterProps) => {
   const redirect = () => {
      setRedirect(true);
   };
   return (
      <div className="registerMain">
         <h1>Inscription</h1>
         <input onSubmit={handleRegisterSubmit} />
         {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
         <p className="link" onClick={redirect}>
            Deja inscrit ? connecte toi !
         </p>
      </div>
   );
};
export default Register;
