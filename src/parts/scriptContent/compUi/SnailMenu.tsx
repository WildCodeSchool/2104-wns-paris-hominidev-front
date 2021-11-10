import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { browser } from 'webextension-polyfill-ts';
import { motion } from 'framer-motion';
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
  const [message, setMessage] = useState('');

  const variants = {
    closed: {
      width: '0px',
      height: '40px',
      overflow: 'hidden',
      opacity: 0,
      transition: {
        delay: 0,
        ease: 'easeInOut',
        duration: 0.1,
      },
    },
    opened: {
      width: '300px',
      transition: {
        delay: 0,
        ease: 'easeInOut',
        duration: 0.25,
      },
    },
  };

  useEffect(() => {
    console.log(message);
  }, [message]);

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
        <SnailButton
          open={open}
          color="#e0e0e0"
          colorHover="#0000ff"
          colorActive="green"
          icon={['fas', 'lock']}
          title="Mon bouton"
          setMessage={setMessage}
          content="coucou"
          type="message"
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
          setMessage={setMessage}
          content="coucou"
          type="message"
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
          setMessage={setMessage}
          content="coucou"
          type="message"
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
          setMessage={setMessage}
          content="coucou"
          type="message"
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
          setMessage={setMessage}
          content="coucou"
          type="message"
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
          setMessage={setMessage}
          content="AIE AIE AIE"
          type="message"
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
          setMessage={setMessage}
          content="coucou"
          type="message"
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
          setMessage={setMessage}
          content="coucou"
          type="message"
          coords={[126, -3]}
          order={8}
        />
        <motion.div className="banner" variants={variants} animate={open && message !== '' ? 'opened' : 'closed'}>
          <div>{message}</div>
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
        </motion.div>
      </Snail>
    </>
  );
};

export default SnailMenu;
