import { createSlice } from '@reduxjs/toolkit';
import { observationMockData } from './observations.const';

const seriesObservationsState: {
  observationChartsData: SeriesModule.IObservationResponse[];
} = {
  observationChartsData: [observationMockData],
};

export const seriesObservationsSlice = createSlice({
  name: 'seriesObservations',
  initialState: seriesObservationsState,
  reducers: {
    updateObservations: (
      state,
      { payload }: { payload: SeriesModule.IObservationResponse }
    ) => {
      state.observationChartsData.push(payload);
    },
  },
});

export const { updateObservations } = seriesObservationsSlice.actions;
export default seriesObservationsSlice.reducer;
