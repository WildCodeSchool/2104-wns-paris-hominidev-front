import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

import '../styles/login.css';

type PopupProps = {
  setOnline: any;
};

const Login = () => {
  const LOGIN = gql`
    query login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        token
      }
    }
  `;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [getToken, { data }] = useLazyQuery(LOGIN);
  if (data) {
    localStorage.setItem('token', JSON.stringify(data.login.token));
  }

  const handleSubmit = async (e: any) => {
    try {
      await getToken({ variables: { email, password } });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Handle me', err);
    }
  };
  const token = localStorage.getItem('token');

  return (
    <div data-testid="online" className="loginMain">
      <form>
        <label id="email" htmlFor="email">
          <input
            className="inputLog"
            value={email}
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
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
            onKeyPress={(e) => (e.key === 'Enter' ? handleSubmit(e) : null)}
          />
        </label>
      </form>
      <br />
      <button onClick={handleSubmit}>LOGIN</button>
      <p className="link"> Mot de passe oublié </p>
    </div>
  );
};
export default Login;
