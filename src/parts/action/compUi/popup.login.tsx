import React, { useState } from 'react';

import '../styles/login.css';

const Login = (props: { handleSubmit:  () => void; email: string; password: string; setEmail: any, setPassword: any }): JSX.Element => {
  const {handleSubmit, email, setEmail, password, setPassword} = props;

  return (
    <div data-testid="online" className="loginMain">
      <form>
        <label id="email" htmlFor="email">
          <input className="inputLog" value={email} type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label id="password" htmlFor="password">
          <br />
          <input
            className="inputLog"
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => (e.key === 'Enter' ? handleSubmit : null)}
          />
        </label>
      </form>
      <br />
      <button type="button" onClick={handleSubmit}>
        LOGIN
      </button>
      <p className="link"> Mot de passe oublié </p>
    </div>
  );
};
export default Login;
