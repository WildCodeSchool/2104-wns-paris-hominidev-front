import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { chrome } from 'jest-chrome';
import App from './App';

// Fix nécessaire pour permettre à l'objet Chrome d'être connu dans jest
Object.assign(global, { chrome });

test('SnailMenu is there', async () => {
   // Tester que le chrome est "mocké"
   expect(chrome).toBeDefined();
   expect(chrome.runtime).toBeDefined();
   expect(chrome.runtime.sendMessage).toBeDefined();

   render(<App />);

   // le snailmenu existe
   const snailmenu = await waitFor(() => screen.getByTestId('snailmenu'));
   expect(snailmenu).toBeInTheDocument();
});
