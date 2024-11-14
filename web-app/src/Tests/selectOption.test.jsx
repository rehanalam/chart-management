import { vi } from 'vitest';
import SeriesModule from '../utils/modules/series';

// Mock SeriesModule
vi.mock('../../utils/modules/series', () => ({
  IFredSeriesResponse: {
    seriess: [
      { id: '1', title: 'Series 1', notes: 'Notes for series 1' },
      { id: '2', title: 'Series 2', notes: 'Notes for series 2' },
    ],
  },
}));

test('computeSelectOption transforms series data correctly', async () => {
  const result = {
    seriess: [
      { id: '1', title: 'Series 1', notes: 'Notes for series 1' },
      { id: '2', title: 'Series 2', notes: 'Notes for series 2' },
    ],
  };

  // Call the function
  const options = await SeriesModule.computeSelectOption(result);

  // Validate the transformation of data
  expect(options).toEqual([
    {
      label: 'Series 1',
      value: '1',
      description: 'Notes for series 1',
    },
    {
      label: 'Series 2',
      value: '2',
      description: 'Notes for series 2',
    },
  ]);
});
