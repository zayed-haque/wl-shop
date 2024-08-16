import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { CartContext } from './CartContext';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';
import AddItem from './AddItem';
import Billing from './Billing';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';
import Footer from './Footer';

function Cart() {
  const navigate = useNavigate();
  const { items, setItems } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartData = async () => {
    const token = localStorage.getItem('accessToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch('https://wl-shop.onrender.com/api/cart', {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response status:', response.status);
        console.error('Response body:', errorText);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Fetched cart data:', data);

      const formattedItems = data.items.map(item => ({
        id: item.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      setItems(formattedItems);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [items]);

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <section className="h-100 gradient-custom">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center my-4">
          <MDBCol md="8">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography tag="h5" className="mb-0">
                  Cart - {items.length} items
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <CartItems items={items} updateQuantity={updateQuantity} removeItem={removeItem} />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4">
            <MDBCard className="mb-4">
              <MDBCardHeader>
                <MDBTypography tag="h5" className="mb-0">
                  Summary
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <OrderSummary items={items} />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Routes>
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
      <Footer />
    </section>
  );
}

export default Cart;