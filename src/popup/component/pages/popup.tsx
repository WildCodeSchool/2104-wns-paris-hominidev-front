import React, { useEffect, useState } from 'react';
import Login from './popup.login';
import StudentDashboard from './popup.studentDashboard';
import './styles/popup.css';

import defAvatar from '../../asset/pngegg.png';

type PopupProps = {
  online: boolean;
};

const Popup = () => {
  const [online, setOnline] = useState(false);
  const token = localStorage.getItem('token');
  console.log('je suis un token', token);

  useEffect(() => {
    if (token) {
      setOnline(true);
    }
  }, [token]);

  return (
    <div className="popupMain">
      {!online ? <Login /> : <StudentDashboard avatar={defAvatar} firstName="Oneristan" />}
    </div>
  );
};

export default Popup;
