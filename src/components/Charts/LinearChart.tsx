import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import SeriesModule from '../../utils/modules/series';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ILinearChartProps {
  observationData: SeriesModule.IObservationResponse;
  settings: SeriesModule.IChartSettings;
}

const LinearChart = ({ observationData, settings }: ILinearChartProps) => {
  const dataFromAPI = useMemo(
    () =>
      observationData.observations.map(({ date, value }) => ({
        date,
        value,
      })),
    [observationData.observations]
  );

  const values = useMemo(
    () =>
      dataFromAPI.map((item) =>
        item.value === '.' ? 0 : parseFloat(item.value)
      ),
    [dataFromAPI]
  );

  const chartData = {
    labels: dataFromAPI.map((item) => item.date),
    datasets: [
      {
        label: settings.title,
        data: values,
        fill: false,
        borderColor: settings.lineColor,
        borderDash:
          settings.lineStyle === 'dotted'
            ? [5, 5]
            : settings.lineStyle === 'dashed'
              ? [10, 10]
              : [],
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        title: {
          display: true,
          text: settings.yAxisLabel,
        },
      },
    },
  };

  return (
    <div className="w-full">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LinearChart;
