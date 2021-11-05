import React, { ReactElement, ReactNode } from 'react';
import { motion } from 'framer-motion';

type SnailProps = {
  open: boolean;
  children: ReactNode;
};

const Snail = (props: SnailProps): ReactElement => {
  const { open, children } = props;
  const variants = {
    open: (custom: number) => ({
      strokeWidth: 0.5,
      strokeOpacity: 1,
      zIndex: 13 - custom,
      opacity: 1,
      transition: {
        delay: custom * 0.04,
        ease: 'easeInOut',
        duration: 0.2,
      },
    }),
    closed: (custom: number) => ({
      strokeWidth: 0,
      strokeOpacity: 0,
      opacity: 0,
      transition: {
        delay: custom * 0.02,
        ease: 'easeInOut',
        duration: 0.1,
      },
    }),
  };

  return (
    <>
      <svg width={367.681} height={410.366} viewBox="0 0 97.282 108.576" id="prefix__svg5" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g id="snail" transform="translate(-54.794 -87.071)" fillOpacity={1} stroke="#fff" style={{ filter: 'drop-shadow(black 1px 2px 2px)' }}>
          <motion.path
            id="snailPart_1"
            d="M111.061 140.676a4.091 4.091 0 01-5.321 2.27 4.091 4.091 0 01-2.271-5.32 4.091 4.091 0 015.321-2.272 4.091 4.091 0 012.272 5.321"
            opacity={1}
            vectorEffect="none"
            fill="#fff"
            fillRule="nonzero"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            custom={open ? 1 : 13}
          />
          <motion.path
            d="M119.693 139.429c-5.05 10.642-17.555 6.165-16.518-1.01-.305 4.438 6.379 7.599 8.03 1.057z"
            id="snailPart_1"
            fill="#fff"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            custom={open ? 2 : 12}
          />
          <motion.path
            d="M111.205 139.476c.138-1.443-.639-3.499-3.034-4.06l10.012-9.883c3.783 4.364 2.903 11.093 1.51 13.896z"
            id="prefix__path11297"
            fill="#fff"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            custom={open ? 3 : 11}
          />
          <motion.path
            d="M98.817 119.955c6.36-2.274 14.867-1.866 19.366 5.578l-10.012 9.883c-.923-.267-1.48-.277-2.766.134z"
            id="prefix__path11299"
            fill="#fff"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            custom={open ? 4 : 10}
          />
          <motion.path
            d="M105.405 135.55c-1.248.799-1.802 1.66-2.23 2.87l-15.823-6.284c1.77-4.786 5.466-10.14 11.465-12.181z"
            id="prefix__path11301"
            fill="#fff"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            custom={open ? 5 : 9}
          />
          <motion.path
            d="M103.175 138.419c-.275 1.91.238 2.998 1.067 4.119l-12.238 12.85c-4.958-5.133-7.834-14.05-4.652-23.252z"
            id="prefix__path11303"
            fill="#fff"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            custom={open ? 6 : 8}
          />
          <motion.path
            d="M104.242 142.538c1.27 2.005 3.847 3.033 6.22 3.271l-.817 18.094c-5.1-.016-13.478-3.19-17.64-8.516z"
            id="prefix__path11305"
            fill="#fff"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            custom={7}
          />
          <motion.path
            d="M110.462 145.81c2.396-.096 5.233-.79 7.47-3.503l14.301 10.713c-5.889 7.887-14.87 11.325-22.588 10.883z"
            id="prefix__path11307"
            fill="#fff"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            custom={open ? 8 : 6}
          />
          <motion.path
            d="M117.932 142.307c1.655-2.238 3.483-6.211 2.834-10.831l17.337-3.589c1.591 6.65.212 17.754-5.87 25.133z"
            id="prefix__path11309"
            fill="#fff"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            custom={open ? 9 : 5}
          />
          <motion.path
            d="M120.766 131.476c-1.316-6.434-5.442-10.345-11.996-12.299l2.827-18.063c15.886 3.034 24.676 16.153 26.506 26.773z"
            id="prefix__path11311"
            fill="#fff"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            custom={open ? 10 : 4}
          />
          <motion.path
            d="M111.597 101.114c-16.725-3.291-30.327 5.866-36.655 16.23l15.684 8.711c6.673-7.87 13.39-7.485 18.144-6.878z"
            id="prefix__path11313"
            fill="#fff"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            custom={open ? 11 : 3}
          />
          <motion.path
            d="M74.942 117.343l15.684 8.712c-6.682 8.394-4.845 18.744-2.629 23.288L72.6 158.645c-4.71-8.656-7.904-26.146 2.343-41.302z"
            id="prefix__path11315"
            fill="#fff"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            custom={open ? 12 : 2}
          />
          <motion.path
            d="M87.997 149.343L72.6 158.645c7.513 15.576 22.6 22.695 34.845 23.63v-18.56c-10.9-1.698-17.318-9.076-19.447-14.372z"
            id="prefix__path11317"
            fill="#fff"
            animate={open ? 'open' : 'closed'}
            variants={variants}
            custom={open ? 13 : 1}
          />
        </g>
      </svg>
      {open && children}
    </>
  );
};

export default Snail;
