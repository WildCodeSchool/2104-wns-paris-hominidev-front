import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { chrome } from 'jest-chrome';

import Overlay from './Overlay';

// Fix nécessaire pour permettre à l'objet Chrome d'être connu dans jest
Object.assign(global, { chrome });

// Tester que chrome est "mocké"
test('chrome is mocked up', async () => {
  expect(chrome).toBeDefined();
  expect(chrome.runtime).toBeDefined();
  expect(chrome.runtime.sendMessage).toBeDefined();
});

/* l'OVERLAY :
 * - existe
 * - ne doit pas recevoir les clicks
 * - a plusieurs éléments enfants :
 *    - snailmenu,
 *    - resources,
 *    - learners,
 *    - askbox,
 *    - whispersbox,
 *    - notificationbox
 */
test('Overlay is up', async () => {
  const callback = jest.fn();
  render(<Overlay /* onClick={callback} */ />);

  const overlay = await waitFor(() => screen.getByTestId('overlay'));
  expect(overlay).toBeInTheDocument();

  // l'overlay ne reçoit pas les clics-
  fireEvent.click(overlay);
  expect(callback.mock.calls.length).toEqual(0);

  expect(screen.getByTestId('snailmenu')).toBeInTheDocument();

  expect(screen.getByTestId('resources')).toBeInTheDocument();
  expect(screen.getByTestId('learners')).toBeInTheDocument();
  expect(screen.getByTestId('askbox')).toBeInTheDocument();
  expect(screen.getByTestId('hispersbox')).toBeInTheDocument();
  expect(screen.getByTestId('notificationbox')).toBeInTheDocument();
});
