import React from 'react';
import { render, screen } from '@testing-library/react';

import EleveCard from './EleveCard';

test('should render EleveCard component', () => {
  render(<EleveCard />);
  expect(
    screen.getByTestId('VueFormateurMain-Classe-Groupe-EleveCard')
  ).toBeInstanceOf(HTMLDivElement);
  expect(
    screen.getByTestId('VueFormateurMain-Classe-Groupe-EleveCard-portrait')
  ).toBeInstanceOf(HTMLImageElement);
});
