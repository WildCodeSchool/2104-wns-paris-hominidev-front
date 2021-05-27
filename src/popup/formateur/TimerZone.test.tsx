import React from 'react';
import { render, screen } from '@testing-library/react';

import TimerZone from './TimerZone';

// on veut afficher le timer
test('renders VueFormateurMain-timerzone', async () => {
  render(<TimerZone />);
  // on veut afficher le timer dans une textarea
  expect(screen.getByTestId('vueFormateurMain-timerzone')).toBeInstanceOf(
    HTMLTextAreaElement
  );
  // on veut vérifier le contenu du timer
  expect(screen.getByTestId('vueFormateurMain-timerzone')).toHaveTextContent(
    'Timer'
  );
});
