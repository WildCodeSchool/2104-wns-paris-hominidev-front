import React, { ReactElement, ReactNode, useRef } from 'react';
import Draggable from 'react-draggable';
import { browser } from 'webextension-polyfill-ts';
import { useAppSelector, useAppDispatch } from '../../background/compFct/hook';

import logo from '../../../assets/logo/logo.svg';
import snailmenuBg from '../assets/snailmenu/snailmenu.png';
import '../styles/SnailMenu.css';
import { decrementUICounter, incrementUICounter } from '../../../compFct/actions';

const SnailMenu: React.FC<{
  open: boolean;
  setOpen: (arg0: boolean) => void;
  children?: ReactNode;
}> = ({ open, setOpen, children }): ReactElement => {
  const { backgroundCounter, uiCounter } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef}>
      <div
        className="handle"
        data-testid="snailmenu"
        id="snailmenu"
        ref={nodeRef}
        style={{
          position: 'absolute',
          filter: 'drop-shadow(black 2px 4px 6px)',
          bottom: '-30px',
          left: '15px',
        }}
      >
        {children}
        <button
          aria-label="snailmenu"
          onDoubleClick={() => {
            setOpen(!open);
          }}
          style={{
            zIndex: 10,
            pointerEvents: 'auto',
            position: open ? 'absolute' : 'relative',
            backgroundImage: `url(${browser.runtime.getURL(logo)}`,
            display: 'inline-block',
            width: '70px',
            height: '70px',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'transparent',
            border: '0 none',
          }}
          type="button"
        />
        <div
          style={{
            zIndex: 10,
            display: open ? 'block' : 'none',
            backgroundImage: `url(${browser.runtime.getURL(snailmenuBg)}`,
            backgroundSize: 'contain',
            width: '232px',
            height: '272px',
            backgroundRepeat: 'no-repeat',
            margin: '-80px 0 0 -80px',
          }}
        >
          <div
            style={{
              width: '200px',
            }}
          >
            <div>Background counter: {backgroundCounter}</div>
            <div>
              UI counter: {uiCounter}
              <div>
                <button onClick={() => dispatch(decrementUICounter())} type="button">
                  -
                </button>
                <span> </span>
                <button onClick={() => dispatch(incrementUICounter())} type="button">
                  +
                </button>
                <span> </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default SnailMenu;
