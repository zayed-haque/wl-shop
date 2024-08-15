import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Billing from './components/Billing';
import AddItem from './components/AddItem';

import './App.css';

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Cart />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/add-item" element={<AddItem />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;