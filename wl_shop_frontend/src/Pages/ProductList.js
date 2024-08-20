import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartProvider } from '../components/CartContext';



const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
        { id: 3, name: 'Product 3', price: 30 },
    ]);

    const navigate = useNavigate();
    

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleOpenBarcodePage = () => {
        navigate('/add-item');
    };
    const handleCartPage = () => {
        navigate('/cart');
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <CartProvider>
        <div className='mx-3'>
            <input className="my-3" type="text" placeholder="Search products" onChange={handleSearch} />
            <div>
                {filteredProducts.map((product) => (
                    <Card className='my-3' key={product.id}>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>Price: ${product.price}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <Button onClick={handleOpenBarcodePage}>Open Barcode Page</Button>
            <Button className="mx-3 my-3 "onClick={handleCartPage}>GotoCart</Button>

        </div>
        </CartProvider>
    );
};

export default ProductList;