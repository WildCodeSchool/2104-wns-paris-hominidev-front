import { screen, render, fireEvent } from '@testing-library/react';
import * as chrome from 'sinon-chrome';
import App from '../App';
import Popup from '../pages/popup';

beforeAll(() => {
   global.chrome = chrome;
});

const Input = ({ onKeyPress }) => <input onKeyPress={onKeyPress} />;

test('render username input element', () => {
   render(<App />);
   const inputElement = screen.getByPlaceholderText('firstname');
   expect(inputElement).toBeTruthy();
});
test('render password input element', () => {
   render(<App />);
   const inputElement = screen.getByPlaceholderText('password');
   expect(inputElement).toBeTruthy();
});
test('should display login if offline', () => {
   render(<Popup online={false} />);
   expect(screen.getByText('mot de passe oublié')).toBeInTheDocument();
});
test('should display student dashboard if online', () => {
   render(<Popup online />);
   expect(screen.getByText('dashboard')).toBeInTheDocument();
});
test('should call handleSubmit onKeypress Enter', () => {
   const mockFunction = jest.fn();
   render(<Popup online={false} handleSubmit={mockFunction} />);
   const inputElement = screen.getByPlaceholderText('password');
   fireEvent.keyPress(inputElement, { key: 'Enter', charCode: 13 });
   expect(mockFunction).toHaveBeenCalledTimes(1);
});
