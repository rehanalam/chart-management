import { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import SeriesModule from '../../utils/modules/series';

interface ILinearChartNivoProps {
  observationData: SeriesModule.IObservationResponse;
}

const LinearChartNivo = ({ observationData }: ILinearChartNivoProps) => {
  const dataFromAPI = useMemo(
    () =>
      observationData.observations.map(({ date, value }) => ({
        x: new Date(date), // Convert date to Date object for Nivo's time scale
        y: value === '.' ? 0 : parseFloat(value), // Parse values, convert '.' to 0
      })),
    [observationData.observations]
  );

  const chartData = [
    {
      id: 'Value Over Time', // Series name
      data: dataFromAPI,
    },
  ];

  return (
    <div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
          truncateTickAt: 0,
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default LinearChartNivo;
