import React from 'react';
import './App.css';
import Filter from './components/filter';
import Navbar from './components/navbar';
import SalesSummary from './components/sales-summary';

function App() {
  return (
    <>
      <Navbar />
      <Filter />
      <SalesSummary />
    </>
  );
}

export default App;
