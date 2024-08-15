// import React, { createContext, useState } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [items, setItems] = useState([
//     { id: 1, name: 'Xiaomi 365', price: 484.99, quantity: 1 },
//     { id: 2, name: 'Ninebot ES2', price: 1449.99, quantity: 3 }
//   ]);

//   const addItemToCart = (item) => {
//     const existingItem = items.find(i => i.name === item.name);
//     if (existingItem) {
//       setItems(items.map(i =>
//         i.name === item.name ? { ...i, quantity: i.quantity + item.quantity } : i
//       ));
//     } else {
//       setItems([...items, item]);
//     }
//   };

//   const removeItem = (id) => {
//     setItems(prevItems => prevItems.filter(item => item.id !== id));
//   };

//   return (
//     <CartContext.Provider value={{ items, addItemToCart, setItems, removeItem }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([
    { id: 1, name: 'Xiaomi 365', price: 484.99, quantity: 1 },
    { id: 2, name: 'Ninebot ES2', price: 1449.99, quantity: 3 }
  ]);

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
