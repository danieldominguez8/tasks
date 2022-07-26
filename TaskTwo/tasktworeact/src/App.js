import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditCustomer from './pages/EditCustomer';
import NewCustomer from './pages/NewCustomer';

function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit' element={<EditCustomer />} />
        <Route path='/create' element={<NewCustomer />} />
      </Routes>
    </Router>
  );
}

export default App;