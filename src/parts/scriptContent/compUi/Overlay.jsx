import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../compFct/actions';
import '../styles/Overlay.css';
import SnailMenu from './SnailMenu';

function Overlay(props) {
  const { backgroundCounter, uiCounter, incrementUICounter, decrementUICounter, loginToken } = props;
  const [online, setOnline] = useState(false);
  const [snailMenuOpen, setSnailMenuOpen] = useState(false);

  // Monitor JWT token availability in redux store to set online status
  useEffect(() => {
    if (loginToken) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, [loginToken]);

  return (
    <div className="Overlay" style={{ opacity: online ? 1 : 0 }}>
      <SnailMenu setSnailMenuOpen={setSnailMenuOpen} snailMenuOpen={snailMenuOpen}>
        <div
          style={{
            width: '200px',
          }}
        >
          <div>Background counter: {backgroundCounter}</div>
          <div>
            UI counter: {uiCounter}
            <div>
              <button onClick={decrementUICounter} type="button">
                -
              </button>
              <span> </span>
              <button onClick={incrementUICounter} type="button">
                +
              </button>
              <span> </span>
            </div>
          </div>
        </div>
      </SnailMenu>
    </div>
  );
}

export default connect((state) => state, actions)(Overlay);
