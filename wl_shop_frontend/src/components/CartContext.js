import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

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

    const updateQuantity = (id, newQuantity) => {
        setItems(prevItems => prevItems.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        ));
    };

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [items]);

    return (
        <CartContext.Provider value={{ items, addItemToCart, setItems, removeItem, updateQuantity, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};