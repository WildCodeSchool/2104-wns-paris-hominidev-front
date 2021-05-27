import React from 'react';
import { render, screen } from '@testing-library/react';

import Timer from './Timer';

// on veut afficher le timer
test('renders VueFormateurMain-timer', async () => {
  render(<Timer />);
  // on veut afficher le timer dans une textarea
  expect(screen.getByTestId('vueFormateurMain-timer')).toBeInstanceOf(
    HTMLTextAreaElement
  );
  // on veut vérifier le contenu du timer
  expect(screen.getByTestId('vueFormateurMain-timer')).toHaveTextContent(
    'Timer'
  );
});
