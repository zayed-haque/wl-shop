import React, { useState } from 'react';
import CartItems from './CartItems';
// import ShippingOptions from './ShippingOptions';
import OrderSummary from './OrderSummary';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, name: 'Xiaomi 365', price: 484.99, quantity: 1 },
    { id: 2, name: 'Ninebot ES2', price: 1449.99, quantity: 3 }
  ]);
  const [shippingCost, setShippingCost] = useState(0);
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '' });

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ));
  };

  const updateShipping = (cost) => {
    setShippingCost(cost);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const { name, price, quantity } = newItem;
    if (name && price && quantity) {
      const newItemObj = {
        id: items.length + 1,
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10)
      };
      setItems([...items, newItemObj]);
      setNewItem({ name: '', price: '', quantity: '' });
    }
  };

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Captured image:', file);
      // You can handle the captured image file here
    }
  };

  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      <button className="add-item-button" onClick={() => navigate('/add-item')}>Add Item</button>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        id="cameraInput"
        style={{ display: 'none' }}
        onChange={handleCapture}
      />
      <CartItems items={items} updateQuantity={updateQuantity} />
      <div className="cart-summary">
        {/* <ShippingOptions updateShipping={updateShipping} /> */}
        <OrderSummary items={items} shippingCost={shippingCost} />
      </div>
    </div>
  );
}

export default Cart;