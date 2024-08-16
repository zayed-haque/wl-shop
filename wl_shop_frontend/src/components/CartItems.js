import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CartItems.css';

function CartItems() {
  const { items, updateQuantity, removeItem } = useContext(CartContext);

  return (
    <div className="cart-items">
      {items.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Your cart is empty</p>
      ) : (
        items.map(item => (
          <div key={item.id} className="row mb-4">
            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
              <div>
                <img src={item.image_url} className="w-100" alt={item.name} />
              </div>
            </div>

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
                <button className="btn btn-primary btn-sm me-1 mb-2" data-bs-toggle="tooltip" title="Remove item" onClick={() => removeItem(item.id)}>
                  <i className="fas fa-trash"></i>
                </button>
                <p className="text-start text-md-center">
                  <strong>${item.price.toFixed(2)}</strong>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CartItems;