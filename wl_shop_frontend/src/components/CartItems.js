import React, { useContext } from 'react';
import { CartContext } from './CartContext';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
=======
>>>>>>> 732d2b8e (Removed wrong version)
import './CartItems.css';

function CartItems() {
  const { items, updateQuantity, removeItem } = useContext(CartContext);

  return (
    <div className="cart-items">
<<<<<<< HEAD
      {items.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Your cart is empty</p>
      ) : (
        items.map(item => (
          <div key={item.id} className="row mb-4">
            

            <div className="col-lg-9 col-md-12 mb-4 mb-lg-0">
              <div className="d-flex justify-content-between align-items-center">
                <p><strong>{item.name}</strong></p>
                <div className="d-flex align-items-center">
                  <button className="btn btn-primary px-3 me-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    -
                  </button>
                  <input value={item.quantity} min={0} type="number" className="form-control quantity-input" onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} />
                  <button className="btn btn-primary px-3 ms-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <button className="btn1 btn-primary btn-sm me-1 mb-2" data-bs-toggle="tooltip" title="Remove item" onClick={() => removeItem(item.id)}>
                <img src="/images/delete.svg" alt="" style={{ width: '24px', height: '24px' }}/>
                  <i className="fas fa-trash"></i>
                </button>
                <p className="text-start text-md-center">
                  <strong>Price: ${item.price.toFixed(2)}</strong>
                </p>
              </div>
            </div>
            <hr></hr>
          </div>
        ))
      )}
=======
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
                  <div className="product-info">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="product-image"
                    />
                    <span>{item.name}</span>
                  </div>
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
>>>>>>> 732d2b8e (Removed wrong version)
    </div>
  );
}

export default CartItems;