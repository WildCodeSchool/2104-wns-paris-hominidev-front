import './styles/login.css';

type PopupProps = {
   handleSubmit: (e: any) => void;
};
const Login = ({ handleSubmit }: PopupProps) => {
   return (
      <div data-testid="online" className="loginMain">
         <form>
            <label id="email" htmlFor="email">
               Email
               <br />
               <input type="text" name="email" placeholder="email" />
            </label>
            <label id="password" htmlFor="password">
               <br />
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
         <p className="link"> Pas encore inscrit ?</p>
         <p> mot de passe oublié </p>
      </div>
   );
};
export default Login;
