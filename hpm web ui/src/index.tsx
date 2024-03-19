import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Auth0Provider } from '@auth0/auth0-react';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const persistor = persistStore(store);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Auth0Provider
        domain="dev-g10af3b2ljs4f5f1.us.auth0.com"
        clientId="W9u1h7iL0OlL6FcrTEJItAWym4JVaghD"
        authorizationParams={{
          // redirect_uri: window.location.origin,
          redirect_uri: 'http://localhost:3000/',
          // redirect_uri: 'http://localhost:3000/',

          audience: 'http://localhost:5000/',
          // scope: 'offline_access',
        }}
        useRefreshTokens={true}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth0Provider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
