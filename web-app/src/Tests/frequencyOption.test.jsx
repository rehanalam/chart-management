import { describe, expect, test } from 'vitest';
import SeriesModule from '../utils/modules/series';
import { last, values } from 'lodash';

describe('getFilteredFrequencyOptions', () => {
  test('returns only Annual frequencies when Annual frequency is provided', () => {
    const result = SeriesModule.getFilteredFrequencyOptions('Annual', 'a');

    expect(result).toEqual([{ value: 'a', label: 'Annual' }]);
  });

  test('returns only Annual/SemiAnnual frequencies when SemiAnnual frequency is provided', () => {
    const result = SeriesModule.getFilteredFrequencyOptions('Semiannual', 'sa');

    expect(result).toEqual([
      { value: 'a', label: 'Annual' },
      { value: 'sa', label: 'Semiannual' },
    ]);
  });
});
