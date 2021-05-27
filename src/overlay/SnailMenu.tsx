import { useState } from 'react';
import Draggable from 'react-draggable';
import snailmenuBg from './snailmenu.png';
import logo from '../logo.svg';

type ISnailMenu = {
   path: string;
};

function SnailMenu({ path }: ISnailMenu): JSX.Element {
   const [menuOpen, setMenuOpen] = useState(false);
   return (
      <Draggable>
         <div
            id="snailmenu"
            className="handle"
            data-testid="snailmenu"
            style={{
               position: 'absolute',
            }}
         >
            <button
               type="button"
               aria-label="snailmenu"
               style={{
                  zIndex: 10,
                  pointerEvents: 'auto',
                  position: menuOpen ? 'absolute' : 'relative',
                  margin: menuOpen ? '80px 0 0 -33px' : '0',
                  backgroundImage: `url(${path}${logo})`,
                  display: 'inline-block',
                  width: '70px',
                  height: '70px',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'transparent',
                  border: '0 none',
               }}
               onDoubleClick={() => {
                  setMenuOpen(!menuOpen);
               }}
            />
            <div
               style={{
                  zIndex: 10,
                  display: menuOpen ? 'block' : 'none',
                  backgroundImage: `url(${path}${snailmenuBg})`,
                  backgroundSize: 'contain',
                  width: '232px',
                  height: '272px',
                  backgroundRepeat: 'no-repeat',
                  margin: menuOpen ? '0' : '-80px 0 0 66',
               }}
            />
         </div>
      </Draggable>
   );
}

export default SnailMenu;
