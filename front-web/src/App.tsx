import { useState } from 'react';
import './App.css';
import Filter from './components/filter';
import Navbar from './components/navbar';
import SalesSummary from './components/sales-summary';
import { StoreFilterData } from './types/filterData';

function App() {
  const [filterData, setFilterData] = useState<StoreFilterData>();

  const onFilterChange = (filter: StoreFilterData) => {
    setFilterData(filter)
  }

  return (
    <>
      <Navbar />
      <Filter onFilterChange={onFilterChange}/>
      <SalesSummary />
    </>
  );
}

export default App;
