import React, { FC, useState } from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import '../App.scss';
import Draw from '../../scriptContent/compUi/Draw';

const FormerDashboard: FC = () => {
  const [message, setMessage] = useState('');

  const POSTMESSAGE = gql`
    query postMessage($value: String!) {
      postMessage(value: $value) {
        value
      }
    }
  `;

  const [Post, { data }] = useLazyQuery(POSTMESSAGE, {
    onCompleted: (data1) => console.log('data1', data1),
    onError: (data2) => console.log('data2', data2),
  });
  if (data) {
    console.log('data', data);
  }

  const handleSubmit = () => {
    console.log('clicked', message);
    Post({ variables: { value: message } });
  };

  return (
    <div className="App">
      <Draw />
      <h1>PygmaAlert</h1>
      <h3>Boite de Dialogue formateur / apprenant</h3>
      <div className="form">
        <div>
          <fieldset>
            <legend>Message</legend>
            <label id="message" htmlFor="message">
              <input type="text" name="message" placeholder="votre message" value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default FormerDashboard;
