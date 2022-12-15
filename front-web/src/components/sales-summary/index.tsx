import { useEffect, useMemo, useState } from 'react';
import { SalesSummaryData } from '../../types/salesSummaryData';
import { formatPrice } from '../../utils/formatters';
import { buildFilterParams, makeRequest } from '../../utils/request';
import { FilterData } from '../filter';
import './styles.css';

type Props = {
    filterData?: FilterData;
};

const initialSummary = {
    sum: 0,
    min: 0,
    max: 0,
    avg: 0,
    count: 0
}

const SalesSummary = ({filterData}: Props) => {
    const [summary, setSummary] = useState<SalesSummaryData>(initialSummary);
    const params = useMemo(() => buildFilterParams(filterData), [filterData]);

    useEffect(() => {
        debugger;
        makeRequest
          .get<SalesSummaryData>('/sales/summary', { params })
          .then((response) => {
            setSummary(response.data);
            console.log("Sales Sumary: " + response.data);
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
           
        </div>
    );
};

export default SalesSummary;