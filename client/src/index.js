import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'font-awesome/css/font-awesome.css';
import './index.css';


ReactDOM.render(
  <React.Fragment>
  <App />
</React.Fragment>,
  document.getElementById('root')
);
serviceWorker.unregister();
