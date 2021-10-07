import React from 'react';
import { render, screen } from '@testing-library/react';

import Groupe from '../compUi/Groupe';

test('should render Groupe component', () => {
  render(<Groupe />);
  expect(screen.getByTestId('VueFormateurMain-Groupe')).toBeInstanceOf(
    HTMLDivElement
  );
  expect(
    screen.getByTestId('VueFormateurMain-Classe-leftSliderButton')
  ).toBeInstanceOf(HTMLButtonElement);
  expect(
    screen.getByTestId('VueFormateurMain-Classe-rightSliderButton')
  ).toBeInstanceOf(HTMLButtonElement);
});
