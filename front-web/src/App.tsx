import { useState } from 'react';
import './App.css';
import Filter, { StoreFilterData } from './components/filter';
import Navbar from './components/navbar';
import SalesSummary from './components/sales-summary';

function App() {
  const [filterData, setFilterData] = useState<StoreFilterData>();

  const onFilterChange = (filter: StoreFilterData) => {
    setFilterData(filter)
  }

  return (
    <>
      <Navbar />
      <Filter onSubmitFilter={onFilterChange}/>
      <SalesSummary />
    </>
  );
}

export default App;
