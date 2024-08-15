import React, { createContext, useState } from 'react';
import CartItems from './CartItems';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([
    { id: 1, name: 'Xiaomi 365', price: 484.99, quantity: 1 },
    { id: 2, name: 'Ninebot ES2', price: 1449.99, quantity: 3 }
  ]);

  const addItemToCart = (item) => {
    setItems([...items, item]);
  };

  const updateQuantity = (id, quantity) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  return (
    <div className="App">
      <CartItems items={items} updateQuantity={updateQuantity} />
    </div>
  );
};