import React, { FC, useEffect, useState, useRef, RefObject, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { browser } from 'webextension-polyfill-ts';
import App from './Draw';

import SnailMenu from './SnailMenu';
import '../styles/style.scss';
import { CollabContextConsumer } from '../compFct/drawCollabWrapper';

const Overlay: FC = () => {
  const [online, setOnline] = useState(false);
  const [drawBoard, setDrawBoard] = useState(false);
  const [snailMenuOpen, setSnailMenuOpen] = useState(false);
  const constraintsRef = useRef<RefObject<Element> & HTMLDivElement>(null);

  // send connexion data to background
  const port = browser.runtime.connect();

  useEffect(() => {
    const waitLogin = setInterval(() => {
      port.postMessage({
        type: 'ISAUTH',
        tab: '',
        url: window.location.href,
        group: '',
        data: {}
      });
    }, 1000);
    
    port.onMessage.addListener((message) => {  
      if (online === false && message.type === 'ISAUTH' && message.data.state === true) {
        setOnline(true);
        clearInterval(waitLogin)
      }
    });
  }, [])
  
  useEffect(() => {
    port.postMessage({
      type: 'PAGELOAD',
      tab: '',
      url: window.location.href,
      group: '',
      data: {}
    });
  }, [])

  useEffect(() => {}, [online])

  return (
    <CollabContextConsumer>
      {online && (
        <motion.div className="Overlay" ref={constraintsRef} style={{ opacity: online ? 1 : 0 }}>
          <motion.div
            className="Snail"
            drag
            dragPropagation
            dragMomentum={false}
            dragConstraints={constraintsRef}
            style={{
              transformOrigin: '50% 50%',
              zIndex: 100,
              position: 'absolute',
              left: '50px',
              top: 'calc(100vh - 100px)',
            }}
            animate={
              !snailMenuOpen
                ? {
                    width: '70px',
                    height: '70px',
                    transition: {
                      delay: 0,
                      duration: 0,
                    },
                  }
                : {}
            }
          >
            <SnailMenu setOpen={setSnailMenuOpen} open={snailMenuOpen} setDrawBoard={setDrawBoard} drawBoard={drawBoard} />
          </motion.div>
          {drawBoard && <App />}
        </motion.div>
      )}
    </CollabContextConsumer>
  );
};

export default Overlay;
