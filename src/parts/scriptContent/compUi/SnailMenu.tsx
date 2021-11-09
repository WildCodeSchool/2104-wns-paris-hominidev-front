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
    <>
      <button
        className="mainButton"
        aria-label="snailmenu"
        onDoubleClick={() => {
          setOpen(!open);
        }}
        style={{
          backgroundImage: `url(${browser.runtime.getURL(logo)}`,
        }}
        type="button"
      />
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
          open={open}
          color="#e0e0e0"
          colorHover="#0000ff"
          colorActive="green"
          icon={['fas', 'lock']}
          title="Mon bouton"
          url="https://google.com"
          coords={[53, 10]}
          order={1}
        />
        <SnailButton
          open={open}
          color="#e0e0e0"
          colorHover="#0000ff"
          colorActive="green"
          icon={['fas', 'lock']}
          title="Mon bouton"
          url="https://google.com"
          coords={[40, 86]}
          order={2}
        />
        <SnailButton
          open={open}
          color="#e0e0e0"
          colorHover="#0000ff"
          colorActive="green"
          icon={['fas', 'lock']}
          title="Mon bouton"
          url="https://google.com"
          coords={[-36, 107]}
          order={3}
        />
        <SnailButton
          open={open}
          color="#e0e0e0"
          colorHover="#0000ff"
          colorActive="green"
          icon={['fas', 'lock']}
          title="Mon bouton"
          url="https://google.com"
          coords={[-100, 57]}
          order={4}
        />
        <SnailButton
          open={open}
          color="#e0e0e0"
          colorHover="#0000ff"
          colorActive="green"
          icon={['fas', 'lock']}
          title="Mon bouton"
          url="https://google.com"
          coords={[-93, -37]}
          order={5}
        />
        <SnailButton
          open={open}
          color="#f5bcbc"
          colorHover="#0000ff"
          colorActive="green"
          icon={['fas', 'lock']}
          title="Mon bouton"
          url="https://google.com"
          coords={[-13, -88]}
          order={6}
        />
        <SnailButton
          open={open}
          color="#e0e0e0"
          colorHover="#0000ff"
          colorActive="green"
          icon={['fas', 'lock']}
          title="Mon bouton"
          url="https://google.com"
          coords={[73, -68]}
          order={7}
        />
        <SnailButton
          open={open}
          color="#bdf5bc"
          colorHover="#0000ff"
          colorActive="green"
          icon={['fas', 'lock']}
          title="Mon bouton"
          url="https://google.com"
          coords={[126, -3]}
          order={8}
        />
      </Snail>
    </>
  );
};

export default SnailMenu;
