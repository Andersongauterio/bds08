import './styles.css';
import ReactApexChart from 'react-apexcharts';
import { buildPieChartConfig } from './helpers';

type Props = {
  labels?: string[];
  name: string;
  series?: number[];
};

const PieChartCard = ({ labels = [], name, series = [] }: Props) => {
  return (
    <div className="pie-chart-container">
     
      <ReactApexChart
          options={buildPieChartConfig(labels, name)}
          type="donut"
          width="300px"
          series={series} />

    </div>
  )
}

export default PieChartCard
