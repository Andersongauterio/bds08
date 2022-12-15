import { useState } from 'react';
import { PieChartConfig } from '../../types/pieChartConfig';
import { SalesSummaryData } from '../../types/salesSummaryData';
import { Store } from '../../types/store';
import { formatPrice } from '../../utils/formatters';
import PieChartCard from '../pie-chart-card';
import './styles.css';

type Props = {
    store: Store | null | undefined;
};

const initialSummary = {
    sum: 0,
    min: 0,
    max: 0,
    avg: 0,
    count: 0
}

const SalesSummary = ({ store }: Props) => {

    const [summary, setSummary] = useState<SalesSummaryData>(initialSummary);
    const [salesByGender, setSalesByGender] = useState<PieChartConfig>();

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