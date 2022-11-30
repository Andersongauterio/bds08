import React, { useMemo, useState } from 'react';
import './App.css';
import Filter from './components/filter';
import Navbar from './components/navbar';
import SalesSummary from './components/sales-summary';
import { FilterData } from './types/filterData';
import { buildFilterParams } from './utils/request';

function App() {

  const [filterData, setFilterData] = useState<FilterData>();

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  const onFilterChange = (filter: FilterData) => {
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
