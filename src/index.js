// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const container = document.getElementById('app');
// const root = createRoot(container);

// if(window.location.pathname.length>1)
//     window.location.href = window.location.href.replace(window.location.pathname, '');

function noop() {}
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'development') {
    window.console.log = noop;
    window.console.warn = noop;
    window.console.error = noop;

    // console.log('test');

    ReactDOM.createRoot(
        document.getElementById("root"),
      )
      .render(
          <App />
      );
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
} else {
    ReactDOM.createRoot(
        document.getElementById("root"),
      )
      .render(
          <App />
      );
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
}
