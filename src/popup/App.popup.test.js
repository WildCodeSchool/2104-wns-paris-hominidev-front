import {
   screen,
   getByRole,
   render,
   fireEvent,
   getByTestId,
} from '@testing-library/react';
import * as chrome from 'sinon-chrome';
import App from './App';

beforeAll(() => {
   global.chrome = chrome;
});

const Input = ({ onKeyPress }) => <input onKeyPress={onKeyPress} />;

test('render username input element', () => {
   render(<App />);
   const inputElement = screen.getByPlaceholderText('username');
   expect(inputElement).toBeTruthy();
});
test('render password input element', () => {
   render(<App />);
   const inputElement = screen.getByPlaceholderText('password');
   expect(inputElement).toBeTruthy();
});
test('initial condition', () => {
   const mock = jest.fn();
   render(<App />);
   const inputElement = screen.getByPlaceholderText('password');
   fireEvent.keyPress(inputElement, { key: 'Enter', charCode: 13 });
});
