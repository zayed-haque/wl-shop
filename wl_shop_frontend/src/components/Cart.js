import React, { useContext } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { CartContext } from './CartContext';
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';
import AddItem from './AddItem';
import Checkout from './Checkout';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { items, addItemToCart, setItems } = useContext(CartContext);

  const [shippingCost, setShippingCost] = useState(0);
  // setItems(useCart());
  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Captured image:', file);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { totalPrice } });
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
      <CartItems />
      <div className="cart-summary">
        <OrderSummary items={items} />
      </div>
      <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>

      <Routes>
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default Cart;