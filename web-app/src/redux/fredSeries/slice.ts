import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { observationMockData } from './observations.const';
import SeriesModule from '../../utils/modules/series';

const seriesObservationsState: {
  observationChartsData: SeriesModule.IObservationState[];
} = {
  observationChartsData: observationMockData,
};

export const seriesObservationsSlice = createSlice({
  name: 'seriesObservations',
  initialState: seriesObservationsState,
  reducers: {
    addObservations: (
      state,
      action: PayloadAction<SeriesModule.IObservationState>
    ) => {
      state.observationChartsData.unshift(action.payload);
    },

    updateObservations: (
      state,
      action: PayloadAction<{
        id: string;
        updatedData: Partial<SeriesModule.IObservationState>;
      }>
    ) => {
      const { id, updatedData } = action.payload;
      const index = state.observationChartsData.findIndex(
        (observation) => observation.id === id
      );

      if (index !== -1) {
        // Update the specific observation with new data
        state.observationChartsData[index] = {
          ...state.observationChartsData[index],
          ...updatedData,
        };
      }
    },

    removeObservations: (state, action: PayloadAction<{ chartId: string }>) => {
      state.observationChartsData = state.observationChartsData.filter(
        (observation) => observation.id !== action.payload.chartId
      );
    },
  },
});

export const { addObservations, updateObservations, removeObservations } =
  seriesObservationsSlice.actions;
export default seriesObservationsSlice.reducer;
