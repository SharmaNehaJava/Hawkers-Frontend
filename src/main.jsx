import React from 'react';
import { createRoot } from 'react-dom/client'; // updated
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/cartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); 

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
        <App />
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
