import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import VueFormateurMain from '../views/VueFormateurMain';

// on veut afficher un composant jsx VueFormateurMain.jsx
test('should render VueFormateurMain component', async () => {
  render(<VueFormateurMain time="10:12" />);
  await waitFor(() => screen.getByTestId('VueFormateurMain'));
  expect(screen.getByTestId('VueFormateurMain')).toBeInstanceOf(HTMLDivElement);
  // on veut afficher un logo sous forme d'image
  expect(screen.getByTestId('VueFormateurMain-logo')).toBeInstanceOf(
    HTMLImageElement
  );
  // on veut afficher le menu de classe dans une div
  expect(screen.getByTestId('VueFormateurMain-Classe')).toBeInstanceOf(
    HTMLDivElement
  );
});
