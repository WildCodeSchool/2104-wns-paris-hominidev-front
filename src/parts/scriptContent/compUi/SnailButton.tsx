import React, { ReactElement, ReactNode } from 'react';
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
    normal: (custom: number) => ({
      strokeWidth: 0.5,
      strokeOpacity: 1,
      zIndex: 13 - custom,
      opacity: 1,
      transition: {
        delay: custom * 0.04,
        ease: 'easeInOut',
        duration: 0.2,
      },
      scale: [0, 1.2, 1],
      filter: ['blur(1px)', 'blur(.5px)', 'blur(0)'],
    }),
    hover: (custom: number) => ({
      strokeWidth: 0,
      strokeOpacity: [1, 1, 0],
      opacity: [1, 1, 0],
      transition: {
        delay: custom * 0.02,
        ease: 'easeInOut',
        duration: 0.1,
      },
      scale: [1, 1.2, 0],
      filter: ['blur(.25px)', 'blur(.5px)', 'blur(2px)'],
    }),
  };

  return (
    <motion.div
      className="snailButton"
      style={{
        backgroundColor: color,
        top: `${coords[0]}px`,
        left: `${coords[1]}px`,
        transitionDelay: `${order * 0.02}`,
      }}
      custom={order}
      animate={{
        opacity: open ? 1 : 0,
        transition: {
          duration: open ? 0.5 : 0.25,
        },
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </motion.div>
  );
};

export default SnailButton;
