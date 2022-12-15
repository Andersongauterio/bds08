import { AxiosRequestConfig } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Filter, { FilterData } from './components/filter';
import Navbar from './components/navbar';
import PieChartCard from './components/pie-chart-card';
import SalesSummary from './components/sales-summary';
import { buildSalesByStoreChart } from './helpers';
import { PieChartConfig } from './types/pieChartConfig';
import { SalesByGender } from './types/salesByGender';
import { SalesSummaryData } from './types/salesSummaryData';
import { buildFilterParams, makeRequest } from './utils/request';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();
  const [salesByGender, setSalesByGender] = useState<PieChartConfig>();
  const [summary, setSummary] = useState<SalesSummaryData>();

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

  useEffect(() => {
    makeRequest
      .get<SalesSummaryData>('/sales/summary', { params })
      .then((response) => {
        setSummary(response.data);
      })
      .catch(() => {
        console.log('Error to fetch sales by date');
      });
  }, [params]);

  const onFilterChange = (filter: FilterData) => {
    console.log(filter);
    setFilterData(filter)
  }

  return (
    <>
      <Navbar />
      <Filter onFilterChange={onFilterChange} />
      <SalesSummary store={filterData?.store} />
      <PieChartCard
        name="Lojas"
        labels={salesByGender?.labels}
        series={salesByGender?.series} />
    </>
  );
}

export default App;
