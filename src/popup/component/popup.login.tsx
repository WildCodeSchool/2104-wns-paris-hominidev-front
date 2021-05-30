type PopupProps = {
   handleSubmit: (e: any) => void;
};
const Login = ({ handleSubmit }: PopupProps) => {
   return (
      <div data-testid="online" className="online">
         <form>
            <label id="username" htmlFor="username">
               Username
               <br />
               <input type="text" name="username" placeholder="username" />
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
         <p> mot de passe oublié </p>
      </div>
   );
};
export default Login;
