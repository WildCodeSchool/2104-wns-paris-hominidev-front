import React from 'react';
import { render, screen } from '@testing-library/react';

import Groupe from './Groupe';

test('renders Groupe', () => {
  render(<Groupe />);
  expect(screen.getByTestId('VueFormateurMain-Groupe')).toBeInstanceOf(
    HTMLDivElement
  );
});
