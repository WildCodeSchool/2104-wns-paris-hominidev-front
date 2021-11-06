import React, { FC, useEffect, useState, useRef, RefObject } from 'react';
import { motion } from 'framer-motion';

import { useAppSelector } from '../../background/compFct/hook';
import '../styles/Overlay.css';
import SnailMenu from './SnailMenu';

const Overlay: FC = (props) => {
  const [online, setOnline] = useState(false);
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
    <>
      <motion.div className="Overlay" ref={constraintsRef} style={{ opacity: online ? 1 : 0 }}>
        <motion.div className="Snail" drag dragPropagation dragMomentum={false} dragConstraints={constraintsRef} style={{ opacity: online ? 1 : 0 }}>
          <SnailMenu setOpen={setSnailMenuOpen} open={snailMenuOpen} {...props} />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Overlay;