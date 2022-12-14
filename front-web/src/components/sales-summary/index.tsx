import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { buildSalesByStoreChart } from '../../helpers';
import { PieChartConfig } from '../../types/pieChartConfig';
import { SalesByGender } from '../../types/salesByGender';
import { SalesSummaryData } from '../../types/salesSummaryData';
import { formatPrice } from '../../utils/formatters';
import { buildFilterParams, makeRequest } from '../../utils/request';
import { StoreFilterData } from '../filter';
import PieChartCard from '../pie-chart-card';
import './styles.css';

type ControlComponentsData = {
    filterData: StoreFilterData;
};


const initialSummary = {
    sum: 0,
    min: 0,
    max: 0,
    avg: 0,
    count: 0
}

const SalesSummary = () => {

    const [controlComponentsData, setControlComponentsData] =
        useState<ControlComponentsData>({
            filterData: { store: null },
        });

    const handleSubmitFilter = (data: StoreFilterData) => {
        setControlComponentsData({
            filterData: data,
        });
    };

    const [summary, setSummary] = useState<SalesSummaryData>(initialSummary);
    const [salesByGender, setSalesByGender] = useState<PieChartConfig>();

    const getSalesByGender = useCallback(() => {
        const params: AxiosRequestConfig = {
            params: {
                storeId: controlComponentsData.filterData.store?.id,
            },
        };

        makeRequest
            .get<SalesByGender[]>('/sales/by-gender', { params })
            .then((response) => {
                const newSalesByGender = buildSalesByStoreChart(response.data);
                setSalesByGender(newSalesByGender);
            })
            .catch(() => {
                console.log('Error to fetch sales by gender');
            });
    }, [controlComponentsData]);

    const getSalesSummary = useCallback(() => {
        const params: AxiosRequestConfig = {
            params: {
                storeId: controlComponentsData.filterData.store?.id,
            },
        };
        makeRequest
            .get<SalesSummaryData>('/sales/summary', { params })
            .then((response) => {
                setSummary(response.data);
            })
            .catch(() => {
                console.log('Error to fetch sales by date');
            });
    }, [controlComponentsData]);

    useEffect(() => {
        getSalesByGender();
      }, [getSalesByGender]);

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