import { useMemo } from 'react';
import { Line } from '@ant-design/charts';
import SeriesModule from '../../utils/modules/series';

interface ILinearChartProps {
  observationData: SeriesModule.IObservationResponse;
}

const LineChartAntd = ({ observationData }: ILinearChartProps) => {
  const dataFromAPI = useMemo(
    () =>
      observationData.observations.map(({ date, value }) => ({
        date,
        value: value === '.' ? 0 : parseFloat(value), // Parse values, convert '.' to 0
      })),
    [observationData.observations]
  );

  const config = {
    data: dataFromAPI,
    xField: 'date',
    yField: 'value',
    seriesField: '', // Optional if you have multiple datasets to differentiate
    smooth: true, // Adds curve tension similar to Chart.js `tension: 0.1`
    lineStyle: {
      stroke: 'rgba(75, 192, 192, 1)', // Line color
      lineWidth: 2,
    },
    tooltip: {
      showMarkers: false,
      formatter: (datum: any) => ({ name: 'Value', value: datum.value }),
    },
    yAxis: {
      min: 0, // Set minimum value if needed
    },
    area: {
      smooth: true, // Smooths area under the line if needed
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
      <Line {...config} />
    </div>
  );
};

export default LineChartAntd;
