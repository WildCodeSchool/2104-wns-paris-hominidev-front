import React from 'react';
import { render, screen } from '@testing-library/react';

import TimerZone from './TimerZone';

const TimerZoneProps = {
  time: '10:12',
};

// on veut afficher le timer
test('renders VueFormateurMain-timerzone', () => {
  render(<TimerZone {...TimerZoneProps} />);
  // on veut afficher le timer dans une textarea
  expect(screen.getByTestId('vueFormateurMain-timerzone')).toBeInstanceOf(
    HTMLTextAreaElement
  );
  // // on veut vérifier le contenu du timer
  // expect(screen.getByTestId('vueFormateurMain-timerzone')).toHaveTextContent(
  //   'Timer'
  // );
});
