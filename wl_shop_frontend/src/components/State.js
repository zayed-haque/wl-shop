import React, { useState } from 'react';
import Cart from './Cart';
import AddItem from './AddItem';

const State= () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Xiaomi 365', price: 484.99, quantity: 1 },
    { id: 2, name: 'Ninebot ES2', price: 1449.99, quantity: 3 }
  ]);
  const [shippingCost, setShippingCost] = useState(0);

  const addItemToCart = (item) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(i => i.name === item.name);
      if (existingItem) {
        return prevItems.map(i =>
          i.name === item.name ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prevItems, { ...item, id: prevItems.length + 1 }];
      }
    });
  };

  return (
    <div>
      <Cart items={items} setItems={setItems} shippingCost={shippingCost} setShippingCost={setShippingCost} />
      <AddItem addItemToCart={addItemToCart} />
    </div>
  );
};

export default State;
