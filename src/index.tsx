import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Get the element to prepend our app to. This could be any element on a specific website or even just `document.body`.
const viewport = document.body;

// Create a div to render the <App /> component to.
const app = document.createElement('div');

// Set the app element's id to `pygmaroot`. This is the same as the element that create-react-app renders to by default so it will work on the local server too.
app.id = 'pygmaroot';

// Prepend the <App /> component to the viewport element if it exists. You could also use `appendChild` depending on your needs.
if (viewport) viewport.prepend(app);

ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById('pygmaroot'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
