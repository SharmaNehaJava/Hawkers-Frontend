import React, { createContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        return state.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case 'REMOVE_FROM_CART':
      const itemToRemove = state.find(item => item.productId === action.payload);
      if (itemToRemove.quantity > 1) {
        return state.map(item =>
          item.productId === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return state.filter(item => item.productId !== action.payload);
      }
    case 'UPDATE_CART':
      return state.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case 'SET_QUANTITY_TO_ZERO':
      return state.map(item =>
        item.productId === action.payload
          ? { ...item, quantity: 0 }
          : item
      );
      case 'CLEAR_CART':
        return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { productId: product._id, name: product.name, price: product.price, imageUrl: product.imageUrl, vendor_id: product.vendor._id } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateCart = (productId, quantity) => {
    dispatch({ type: 'UPDATE_CART', payload: { productId, quantity } });
  };

  const setQuantityToZero = (productId) => {
    dispatch({ type: 'SET_QUANTITY_TO_ZERO', payload: productId });
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart, setQuantityToZero, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;