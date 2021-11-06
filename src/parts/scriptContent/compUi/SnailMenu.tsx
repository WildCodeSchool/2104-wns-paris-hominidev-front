import React, { ReactElement, ReactNode } from 'react';
import { browser } from 'webextension-polyfill-ts';
import { useAppSelector, useAppDispatch } from '../../background/compFct/hook';

import Snail from './Snail';
import SnailButton from './SnailButton';
import logo from '../../../assets/logo/logo.svg';

import '../styles/SnailMenu.css';
import { decrementUICounter, incrementUICounter } from '../../../compFct/actions';

const SnailMenu: React.FC<{
  open: boolean;
  setOpen: (arg0: boolean) => void;
  children?: ReactNode;
}> = ({ open, setOpen }): ReactElement => {
  const { backgroundCounter, uiCounter } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        aria-label="snailmenu"
        onDoubleClick={() => {
          setOpen(!open);
        }}
        style={{
          zIndex: 10,
          pointerEvents: 'auto',
          position: 'absolute',
          backgroundImage: `url(${browser.runtime.getURL(logo)}`,
          display: 'inline-block',
          width: '70px',
          height: '70px',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'transparent',
          border: '0 none',
          marginLeft: '-35px',
          marginTop: '-20px',
        }}
        type="button"
      />
      <div
        style={{
          zIndex: -1,
          position: 'absolute',
          marginLeft: '-200px',
          marginTop: '-185px',
          top: 0,
          width: '367.681px',
          height: '410.366px',
        }}
      >
        {' '}
        <Snail open={open}>
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
          <SnailButton
            color="red"
            colorHover="blue"
            colorActive="green"
            icon={['fas', 'lock']}
            title="Mon bouton"
            url="https://google.com"
            coords={[200, 200]}
          />
        </Snail>
      </div>
    </div>
  );
};

export default SnailMenu;
