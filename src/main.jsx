import React from 'react';
import { createRoot } from 'react-dom/client'; // updated
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/cartContext.jsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // createRoot instead of ReactDOM.render

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
