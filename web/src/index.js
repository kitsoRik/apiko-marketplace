import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apollo';
import socket from './services/socketio';

ReactDOM.render(
  (<Provider store={store}>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </Provider>),
  document.getElementById('root')
);
