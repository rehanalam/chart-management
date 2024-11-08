import React, { useMemo } from 'react';
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
import { color } from 'chart.js/helpers';

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

const ChartComponent = ({ observationData, settings }: IChartProps) => {
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
    labels: dataFromAPI.map((item) => dayjs(item.date).year()),
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
    },
    scales: {
      y: {
        title: {
          display: true,
          text: settings.yAxisLabel,
          color: '#9ca3af',
        },
        ticks: {
          color: '#9ca3af', // Y-Axis ticks color
        },
        grid: {
          display: false, // Hides Y-Axis grid lines
        },
      },
      x: {
        ticks: {
          color: '#9ca3af', // Y-Axis ticks color
        },
        grid: {
          display: false, // Hides Y-Axis grid lines
        },
      },
    },
  };

  return (
    <div className="w-full ">
      {settings.chartType === 'line' ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default ChartComponent;
