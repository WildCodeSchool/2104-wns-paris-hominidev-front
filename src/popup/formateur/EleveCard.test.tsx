import React from 'react';
import { render, screen } from '@testing-library/react';

import EleveCard from './EleveCard';

test('renders EleveCard', () => {
  render(<EleveCard />);
  expect(
    screen.getByTestId('VueFormateurMain-Classe-Groupe-EleveCard')
  ).toBeInstanceOf(HTMLDivElement);
  expect(
    screen.getByTestId('VueFormateurMain-Classe-Groupe-EleveCard-portrait')
  ).toBeInstanceOf(HTMLImageElement);
});
