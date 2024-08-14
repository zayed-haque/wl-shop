import React, { useState } from 'react';

function ItemAdder({ item, onAddItem }) {
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        onAddItem({ ...item, quantity });
    };

    return (
        <div className="item-adder">
            <h2>{item.name}</h2>
            <p>Price: ${item.price.toFixed(2)}</p>
            <div>
                <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button onClick={handleAdd}>Add to Cart</button>
        </div>
    );
}

export default ItemAdder;
