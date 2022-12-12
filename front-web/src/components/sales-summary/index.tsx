import { useEffect, useMemo, useState } from 'react';
import { buildSalesByStoreChart } from '../../helpers';
import { StoreFilterData } from '../../types/storeFilterData';
import { PieChartConfig } from '../../types/pieChartConfig';
import { SalesByGender } from '../../types/salesByGender';
import { SalesSummaryData } from '../../types/salesSummaryData';
import { formatPrice } from '../../utils/formatters';
import { buildFilterParams, makeRequest } from '../../utils/request';
import PieChartCard from '../pie-chart-card';
import './styles.css';


const initialSummary = {
    sum: 0,
    min: 0,
    max: 0,
    avg: 0,
    count: 0
}

const SalesSummary = () => {

    const [summary, setSummary] = useState<SalesSummaryData>(initialSummary);
    const [filterData, setFilterData] = useState<StoreFilterData>();
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

    return (
        <div className='sales-summary-container'>
            <div className='sales-summary-header'>
                <h1 className='sales-summary-total-amount'>{formatPrice(summary.sum)} </h1>
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