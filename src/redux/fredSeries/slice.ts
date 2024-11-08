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
      state.observationChartsData.unshift(payload);
    },

    removeObservations: (
      state,
      { payload }: { payload: { chartId: string } }
    ) => {
      state.observationChartsData = state.observationChartsData.filter(
        (observation) => observation.id !== payload.chartId
      );
    },
  },
});

export const { updateObservations, removeObservations } =
  seriesObservationsSlice.actions;
export default seriesObservationsSlice.reducer;
