export const observationMockData = {
  id: '12345',
  realtime_start: '2024-11-07',
  realtime_end: '2024-11-07',
  observation_start: '2020-07-01',
  observation_end: '2025-01-16',
  units: 'pc1',
  output_type: 1,
  file_type: 'json',
  order_by: 'observation_date',
  sort_order: 'asc',
  count: 5,
  offset: 0,
  limit: 222,
  observations: [
    {
      realtime_start: '2024-11-07',
      realtime_end: '2024-11-07',
      date: '2020-01-01',
      value: '33.42583',
    },
    {
      realtime_start: '2024-11-07',
      realtime_end: '2024-11-07',
      date: '2021-01-01',
      value: '42.40520',
    },
    {
      realtime_start: '2024-11-07',
      realtime_end: '2024-11-07',
      date: '2022-01-01',
      value: '-48.12769',
    },
    {
      realtime_start: '2024-11-07',
      realtime_end: '2024-11-07',
      date: '2023-01-01',
      value: '-33.85547',
    },
    {
      realtime_start: '2024-11-07',
      realtime_end: '2024-11-07',
      date: '2024-01-01',
      value: '.',
    },
  ],
  chartSettings: {
    title: 'Real Gross National Product',
    yAxisLabel: 'Percent Change from Year Ago',
    lineColor: '#4bc0c0',
    lineStyle: 'solid',
    chartType: 'line',
  },
};
