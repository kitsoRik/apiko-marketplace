import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  link: createUploadLink({

    uri: 'http://localhost:3500/graphql',
    credentials: 'include'
  }),
  cache: new InMemoryCache({
    dataIdFromObject: o => o.id
  }),
  credentials: 'include'
});

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
