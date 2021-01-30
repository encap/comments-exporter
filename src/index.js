import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './global.sass';

window.React = React;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
