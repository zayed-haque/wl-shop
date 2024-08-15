import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const addItemToCart = (item) => {
    const existingItem = items.find(i => i.name === item.name);
    if (existingItem) {
      setItems(items.map(i =>
        i.name === item.name ? { ...i, quantity: i.quantity + item.quantity } : i
      ));
    } else {
      setItems(prevItems => [
        ...prevItems,
        { ...item, id: Date.now() }
      ]);
    }
  };

  const removeItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ items, addItemToCart, setItems, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
