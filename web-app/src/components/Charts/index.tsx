import { useMemo } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import dayjs from 'dayjs';
import SeriesModule from '../../utils/modules/series';
import moment from 'moment';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IChartProps {
  observationData: SeriesModule.IObservationResponse;
  settings: SeriesModule.IChartSettings;
}

var formatDate = (dateString: string) => {
  return dayjs(dateString).format('YYYY');
};

const ChartComponent = ({ observationData, settings }: IChartProps) => {
  const dataFromAPI = useMemo(
    () =>
      observationData.observations.map(({ date, value }) => ({
        date: formatDate(date),
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
        backgroundColor:
          settings.chartType === 'bar' ? settings.lineColor : undefined,
        borderColor:
          settings.chartType === 'line' ? settings.lineColor : undefined,
        borderDash:
          settings.chartType === 'line' && settings.lineStyle === 'dotted'
            ? [5, 5]
            : settings.lineStyle === 'dashed'
              ? [10, 10]
              : [],
        tension: settings.chartType === 'line' ? 0.3 : 0,
      },
    ],
  };

  const chartOptions = {
    title: {
      color: '#9ca3af',
      display: false,
    },
    scales: {
      y: {
        title: {
          display: true,
          text: settings.yAxisLabel,
          color: '#9ca3af',
        },
        ticks: {
          color: '#9ca3af',
        },
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: '#9ca3af',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full height-[300px]">
      {settings.chartType === 'line' ? (
        <Line
          data={chartData}
          options={chartOptions}
          width="100%"
          height="75%"
        />
      ) : (
        <Bar
          data={chartData}
          options={chartOptions}
          width="100%"
          height="75%"
        />
      )}
    </div>
  );
};

export default ChartComponent;
