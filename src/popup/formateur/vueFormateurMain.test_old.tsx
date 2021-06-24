import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import VueFormateurMain from './vueFormateurMain';

// on veut afficher un composant jsx VueFormateurMain.jsx
test('renders VueFormateurMain', async () => {
  render(<VueFormateurMain />);
  await waitFor(() => screen.getByTestId('vueFormateurMain'));
  expect(screen.getByTestId('vueFormateurMain')).toBeInstanceOf(HTMLDivElement);
  // on veut afficher un logo sous forme d'image
  expect(screen.getByTestId('vueFormateurMain-logo')).toBeInstanceOf(
    HTMLImageElement
  );
  // on veut afficher le menu de classe dans une div
  expect(screen.getByTestId('vueFormateurMain-classe')).toBeInstanceOf(
    HTMLDivElement
  );
});
