import React from 'react';
import { render, screen } from '@testing-library/react';

import Classe from './Classe';
// on veut afficher le timer
test('renders VueFormateurMain-classe', async () => {
  render(<Classe />);
  // on veut afficher le timer dans une textarea
  expect(screen.getByTestId('vueFormateurMain-classe')).toBeInstanceOf(
    HTMLDivElement
  );
  // on veut insérer un form dans la classe pour choisir les groupes
  expect(screen.getByTestId('vueFormateurMain-classe-form')).toBeInstanceOf(
    HTMLFormElement
  );
  expect(
    screen.getByTestId('vueFormateurMain-classe-form-label')
  ).toBeInstanceOf(HTMLLabelElement);
  expect(
    screen.getByTestId('vueFormateurMain-classe-form-select')
  ).toBeInstanceOf(HTMLSelectElement);
  expect(screen.getByTestId('vueFormateurMain-classe-checkbox')).toBeInstanceOf(
    HTMLInputElement
  );
});
