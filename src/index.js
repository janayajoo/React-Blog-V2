import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/* <Auth0Provider
    domain="dev-lfvri6i2laa865nd.us.auth0.com"
    clientId="9npzs5Ebk9gM1VQbjtxTO9oeegpa44eU"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  > */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </Auth0Provider> */}
  </React.StrictMode>
);