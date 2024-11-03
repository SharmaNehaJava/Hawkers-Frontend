import React, { createContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.cart.find((item) => item.productId === action.payload.productId);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter((item) => item.productId !== action.payload),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  const addToCart = (productId, quantity, price, image) => {
    dispatch({ type: 'ADD_ITEM', payload: { productId, quantity, price, image } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  return (
    <CartContext.Provider value={{ cart: state.cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
