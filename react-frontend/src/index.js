import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './comp/context/useContext';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './comp/context/cartContext';
import { CookiesProvider } from 'react-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="880798137528-7potkmjpooksskiv952kc4nqtegfe4gi.apps.googleusercontent.com">
    <CartProvider>
      <UserProvider>
          <App />
      </UserProvider>
    </CartProvider>
    </GoogleOAuthProvider>
    </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
