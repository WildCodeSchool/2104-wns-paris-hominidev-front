//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { browser } from 'webextension-polyfill-ts';
import Login from '../compUi/popup.login';
import StudentDashboard from '../compUi/popup.studentDashboard';
import defAvatar from '../assets/pngegg.png';
import { useLazyQuery } from '@apollo/client';
import '../styles/popup.css';
import { LOGIN } from '../../../compFct/requests';

const Popup = () => {
  const [loginToken, setLoginToken] = useState('');
  const [online, setOnline] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [getToken, { data }] = useLazyQuery(LOGIN);
 
  if (data) {
    localStorage.setItem('token', JSON.stringify(data.login.token));
    localStorage.setItem('id', JSON.stringify(data.login.id));
  }
  
  useEffect(() => {
    setLoginToken(localStorage.getItem('token').length > 0 && localStorage.getItem('token'))
  }, []);

  useEffect(() => {
    if (loginToken.length > 0) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, [loginToken]);

  const logout = () => {
    localStorage.setItem('token', '');
    setLoginToken('');
    setOnline(false);
  }

  const handleSubmit = async () => {
    try {
      getToken({ variables: { email, password } });
      setOnline(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Handle me', err);
    }
  };

  return (
    <div className="popupMain">
      {!online ? 
      <Login 
        handleSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      /> 
      :
      <StudentDashboard 
        avatar={defAvatar}
        firstName="Oneristan"
        logout={logout}
      />}
    </div>
  );
};

export default Popup;
