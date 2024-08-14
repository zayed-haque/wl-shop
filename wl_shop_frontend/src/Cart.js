import React from 'react';

function Cart({ cart, onRemoveItem }) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.name} - x{item.quantity} @ ${item.price} each
                        <button onClick={() => onRemoveItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={() => alert('Checkout process not implemented')}>Checkout</button>
        </div>
    );
}

export default Cart;
