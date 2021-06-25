import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Classe from '../uiComponents/Classe';
// on veut afficher le timer
test('should render Classe component', () => {
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

test('should display list of groups on Classe select', async () => {
  render(<Classe />);
  await expect(screen.getByText('choisissez un groupe')).toBeInTheDocument();
  fireEvent.change(screen.getByTestId('VueFormateurMain-Classe-form-select'), {
    target: { value: 'groupe 1' },
  });
  expect(screen.getByText('groupe 1')).toBeInTheDocument();
  // await waitFor(() => screen.getByTestId());
});
