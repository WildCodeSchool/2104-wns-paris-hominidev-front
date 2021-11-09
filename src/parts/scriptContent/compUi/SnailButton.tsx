import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';

type SnailButtonProps = {
  color: string;
  colorHover: string;
  colorActive: string;
  icon: [IconPrefix, IconName];
  title: string;
  url: string;
  coords: [number, number];
  open: boolean;
  order: number;
};

const SnailButton = (props: SnailButtonProps): ReactElement => {
  const { color, colorHover, colorActive, icon, title, url, coords, open, order } = props;

  const variants = {
    open: (custom: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: custom * 0.05 + 0.25,
        ease: 'easeInOut',
        duration: 0.1,
      },
    }),
    close: (custom: number) => ({
      scale: [1, 1.5, 1, 0],
      opacity: [1, 1, 0],
      transition: {
        delay: 0.3 / (custom / 2),
        ease: 'easeInOut',
        duration: 0.15,
      },
    }),
  };

  // https://natclark.com/tutorials/javascript-lighten-darken-hex-color/
  const newShade = (hexColor: string, percent: number) => {
    const newhexColor = hexColor.replace(`#`, ``);
    const num = parseInt(newhexColor, 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const B = ((num >> 8) & 0x00ff) + amt;
    const G = (num & 0x0000ff) + amt;

    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)}`;
  };

  return (
    <motion.div
      className="snailButton"
      style={{
        background: `linear-gradient(145deg, ${color}, ${newShade(color, -1)})`,
        boxShadow: `5px 5px 10px ${newShade(color, 1)}, -5px -5px 10px #ffffff`,
        top: `${coords[0]}px`,
        left: `${coords[1]}px`,
      }}
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={open ? 'open' : 'close'}
      variants={variants}
      custom={order}
    >
      <FontAwesomeIcon icon={icon} />
    </motion.div>
  );
};

export default SnailButton;
