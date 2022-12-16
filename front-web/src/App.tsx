import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Filter, { FilterData } from './components/filter';
import Navbar from './components/navbar';
import PieChartCard from './components/pie-chart-card';
import SalesSummary from './components/sales-summary';
import { buildSalesByStoreChart } from './helpers';
import { PieChartConfig } from './types/pieChartConfig';
import { SalesByGender } from './types/salesByGender';
import { buildFilterParams, makeRequest } from './utils/request';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();
  const [salesByGender, setSalesByGender] = useState<PieChartConfig>();

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesByGender[]>('/sales/by-gender', { params })
      .then((response) => {
        const newSalesByGender = buildSalesByStoreChart(response.data);
        setSalesByGender(newSalesByGender);
      })
      .catch(() => {
        console.log('Error to fetch sales by gender');
      });
  }, [params]);

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter)
  }

  return (
    <>
      <Navbar />
      <div className="app-container">
        <Filter onFilterChange={onFilterChange} />
        <div className="app-sales-summary">
          <SalesSummary filterData={filterData} />
          <PieChartCard
            name="Lojas"
            labels={salesByGender?.labels}
            series={salesByGender?.series} />
        </div>
      </div>
    </>
  );
}

export default App;
