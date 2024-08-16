import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './CartItems.css';

function CartItems() {
  const { items, updateQuantity, removeItem } = useContext(CartContext);

  return (
    <div className="cart-items">
      <table>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QTY</th>
            <th>TOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                Your cart is empty 
              </td>
            </tr>
          ) : (
            items.map(item => (
              <tr key={item.id} className="cart-item">
                <td className="product-column">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                  />
                  {item.name}
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    min="1"
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeItem(item.id)}>x</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CartItems;