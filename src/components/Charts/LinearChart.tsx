import React, { useMemo } from 'react';
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
}

const LinearChart = ({ observationData }: ILinearChartProps) => {
  const dataFromAPI = useMemo(
    () =>
      observationData.observations.map(({ date, value }) => ({
        date,
        value,
      })),
    [observationData.observations]
  );

  const chartData = {
    labels: dataFromAPI.map((item) => item.date), // x-axis labels (dates)
    datasets: [
      {
        label: 'Value Over Time',
        data: dataFromAPI.map((item) =>
          item.value === '.' ? 0 : parseFloat(item.value)
        ), // y-axis data (values)
        fill: false, // No area under the curve
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        tension: 0.1, // Line curve tension
      },
    ],
  };

  return (
    <div className="w-full">
      <Line data={chartData} />
    </div>
  );
};

export default LinearChart;
