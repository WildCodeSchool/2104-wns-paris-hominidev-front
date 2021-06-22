import {useState} from 'react';
import {connect} from 'react-redux';

import * as actions from './actions';
import './Overlay.css';
import SnailMenu from './SnailMenu';

function Overlay(props) {
  const {
    backgroundCounter,
    uiCounter,
    incrementUICounter,
    decrementUICounter,
    sendHello
  } = props;
  
  const [snailMenuOpen, setSnailMenuOpen] = useState(false);
  
  return (
    <div className="Overlay">
      <SnailMenu
        setSnailMenuOpen={setSnailMenuOpen}
        snailMenuOpen={snailMenuOpen}
      >
      <div style={{width: 200}}>
                <div>
                    Background counter: {backgroundCounter}
                </div>
                <div>
                    UI counter: {uiCounter}
                    <div>
                        <button onClick={decrementUICounter} type="button">-</button>
                        <span> </span>
                        <button onClick={incrementUICounter} type="button">+</button>
                        <span> </span>
                        <button onClick={sendHello} type="button">Hello</button>
                    </div>
                </div>
            </div>
            </SnailMenu>
    </div>
  );
}

export default connect(state => state, actions)(Overlay);
