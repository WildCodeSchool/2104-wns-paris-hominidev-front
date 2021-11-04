import React, { FC, useEffect, useState } from 'react';

import { useAppSelector } from '../../background/compFct/hook';
import '../styles/Overlay.css';
import SnailMenu from './SnailMenu';

const Overlay: FC = (props) => {
  const [online, setOnline] = useState(false);
  const [snailMenuOpen, setSnailMenuOpen] = useState(false);
  const loginToken = useAppSelector((state) => state.loginToken);

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
      <SnailMenu setOpen={setSnailMenuOpen} open={snailMenuOpen} {...props} />
    </div>
  );
};

export default Overlay;
