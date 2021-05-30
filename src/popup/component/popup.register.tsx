import logo from '../asset/logo.png';

export {};
type PopupRegisterProps = {
   handleRegisterSubmit: (e: any) => void;
};
const Register = ({ handleRegisterSubmit }: PopupRegisterProps) => {
   return (
      <div className="App">
         <img src={logo} className="App-logo" alt="logo" />
         <h1> Inscrit toi !</h1>
         <form>
            <label id="firstname" htmlFor="firstname">
               firstname
               <br />
               <input type="text" name="firstname" placeholder="firstname" />
            </label>
            <label id="lastname" htmlFor="lastname">
               lastname
               <br />
               <input type="text" name="lastname" placeholder="lastname" />
            </label>
            <label id="email" htmlFor="email">
               email
               <br />
               <input type="email" name="email" placeholder="email" />
            </label>
            <label id="password" htmlFor="password">
               Password
               <br />
               <input type="text" name="password" placeholder="password" />
            </label>
            <label id="confirmPassword" htmlFor="confirmPassword">
               confirm Password
               <br />
               <input
                  type="text"
                  name="confirmPassword"
                  placeholder="confirm your Password"
                  onKeyPress={handleRegisterSubmit}
               />
            </label>
         </form>
      </div>
   );
};
export default Register;
