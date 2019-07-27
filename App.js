import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import Root from './src/routes';

// This is used in order to see requests on the Chrome DevTools
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
