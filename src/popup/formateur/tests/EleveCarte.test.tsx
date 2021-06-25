import React from 'react';
import { render, screen } from '@testing-library/react';

import EleveCarte from '../uiComponents/EleveCarte';

const EleveCarteProps = {
  portrait:
    'https://www.mediafire.com/view/keny0p2vcze6mlf/Fawn%252C_Bobby.jpg/file',
  prenom: 'Bobby',
  nom: 'Fawn',
};

test('should render EleveCarte component', () => {
  render(<EleveCarte {...EleveCarteProps} />);
  expect(
    screen.getByTestId('VueFormateurMain-Classe-Groupe-EleveCarte')
  ).toBeInstanceOf(HTMLDivElement);
  expect(
    screen.getByTestId('VueFormateurMain-Classe-Groupe-EleveCarte-portrait')
  ).toBeInstanceOf(HTMLImageElement);
  expect(
    screen.getByTestId('VueFormateurMain-Classe-Groupe-EleveCarte-prenom')
  ).toBeInstanceOf(HTMLParagraphElement);
  expect(
    screen.getByTestId('VueFormateurMain-Classe-Groupe-EleveCarte-nom')
  ).toBeInstanceOf(HTMLParagraphElement);
});
