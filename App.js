import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import store from './src/store';
import AppNavigator from './src/routes';

const AppContainer = createAppContainer(AppNavigator);

// This is used in order to see requests on the Chrome DevTools
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
