import React from 'react';
import { render, screen } from '@testing-library/react';

import Classe from './Classe';
// on veut afficher le timer
test('renders VueFormateurMain-classe', () => {
  render(<Classe />);
  // on veut afficher le timer dans une textarea
  expect(screen.getByTestId('VueFormateurMain-Classe')).toBeInstanceOf(
    HTMLDivElement
  );
  // on veut insérer un form dans la classe pour choisir les groupes
  expect(screen.getByTestId('VueFormateurMain-Classe-form')).toBeInstanceOf(
    HTMLFormElement
  );
  expect(
    screen.getByTestId('VueFormateurMain-Classe-form-label')
  ).toBeInstanceOf(HTMLLabelElement);
  expect(
    screen.getByTestId('VueFormateurMain-Classe-form-select')
  ).toBeInstanceOf(HTMLSelectElement);
  expect(screen.getByTestId('VueFormateurMain-Classe-checkbox')).toBeInstanceOf(
    HTMLInputElement
  );
});
