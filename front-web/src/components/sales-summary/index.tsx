import { useEffect, useMemo, useState } from 'react';
import { buildSalesByStoreChart } from '../../helpers';
import { FilterData } from '../../types/filterData';
import { PieChartConfig } from '../../types/pieChartConfig';
import { SalesByGender } from '../../types/salesByGender';
import { buildFilterParams, makeRequest } from '../../utils/request';
import PieChartCard from '../pie-chart-card';
import './styles.css';

const SalesSummary = () => {
    const [filterData, setFilterData] = useState<FilterData>();
    const params = useMemo(() => buildFilterParams(filterData), [filterData]);
    const [salesByGender, setSalesByGender] = useState<PieChartConfig>();

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

    return (
        <div className='sales-summary-container'>
            <div className='sales-summary-header'>
                <h1 className='sales-summary-total-amount'> 746.484,00 </h1>
                <h3 className='sales-summary-subtitle'> Total de vendas </h3>
            </div>
            <div className='sales-summary-pie-chart'>
                <PieChartCard
                    name="Lojas"
                    labels={salesByGender?.labels}
                    series={salesByGender?.series} />
            </div>
        </div>
    );
};

export default SalesSummary;