//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';


import Login from '../compUi/popup.login';
import StudentDashboard from '../compUi/popup.studentDashboard';
import * as actions from '../../../compFct/actions';

import defAvatar from '../assets/pngegg.png';
import '../styles/popup.css';

const Popup = (props) => {
  const { loginToken, logout } = props;
  const [online, setOnline] = useState(false);
  
  // Monitor JWT token availability in redux store to set online status
  useEffect(() => {
    if (loginToken !== '') {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, [loginToken]);

  return (
    <div className="popupMain">
      {!online ? <Login /> : <StudentDashboard avatar={defAvatar} firstName="Oneristan" logout={logout}/>}
    </div>
  );
};

export default connect((state) => state, actions)(Popup);
