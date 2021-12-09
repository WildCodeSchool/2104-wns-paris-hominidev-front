import React, { FC, useEffect, useState, useRef, RefObject } from 'react';
import { motion } from 'framer-motion';
import { browser } from 'webextension-polyfill-ts';
import App from './Draw';

import { useAppSelector } from '../../background/compFct/hook';
import SnailMenu from './SnailMenu';
import '../styles/style.scss';
import { CollabContextConsumer } from '../compFct/drawCollabWrapper';

const Overlay: FC = (props) => {
  const [online, setOnline] = useState(false);
  const [drawBoard, setDrawBoard] = useState(false);
  const [snailMenuOpen, setSnailMenuOpen] = useState(false);
  const loginToken = useAppSelector((state) => state.loginToken);
  const constraintsRef = useRef<RefObject<Element> & HTMLDivElement>(null);

  // Monitor JWT token availability in redux store to set online status
  useEffect(() => {
    if (loginToken) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, [loginToken]);

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
            <SnailMenu setOpen={setSnailMenuOpen} open={snailMenuOpen} setDrawBoard={setDrawBoard} drawBoard={drawBoard} {...props} />
          </motion.div>
          {drawBoard && <App />}
        </motion.div>
      )}
    </CollabContextConsumer>
  );
};

export default Overlay;
