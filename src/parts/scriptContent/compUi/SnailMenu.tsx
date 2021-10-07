import React, { useRef } from 'react';
import Draggable from 'react-draggable';

import { browser } from 'webextension-polyfill-ts';

import logo from '../../../assets/logo/logo.svg';
import snailmenuBg from '../assets/snailmenu/snailmenu.png';

type SnailMenuProps = {
  snailMenuOpen: boolean;
  setSnailMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: any;
};

function SnailMenu({ snailMenuOpen, setSnailMenuOpen, children }: SnailMenuProps): any {
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
            setSnailMenuOpen(!snailMenuOpen);
          }}
          style={{
            zIndex: 10,
            pointerEvents: 'auto',
            position: snailMenuOpen ? 'absolute' : 'relative',
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
            display: snailMenuOpen ? 'block' : 'none',
            backgroundImage: `url(${browser.runtime.getURL(snailmenuBg)}`,
            backgroundSize: 'contain',
            width: '232px',
            height: '272px',
            backgroundRepeat: 'no-repeat',
            margin: '-80px 0 0 -80px',
          }}
        />
      </div>
    </Draggable>
  );
}

export default SnailMenu;
