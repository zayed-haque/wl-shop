import React from 'react';

function ShippingOptions({ updateShipping }) {
  return (
    <div className="shipping-options">
      <h3>Choose shipping mode:</h3>
      <label>
        <input 
          type="radio" 
          name="shipping" 
          defaultChecked 
          onChange={() => updateShipping(0)}
        />
        Store pickup (2-3 days) - FREE
      </label>
      <label>
        <input 
          type="radio" 
          name="shipping" 
          onChange={() => updateShipping(9.99)}
        />
        Delivery at home (3-5 days) - $9.99
      </label>
    </div>
  );
}

export default ShippingOptions;