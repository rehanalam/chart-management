import { combineReducers } from '@reduxjs/toolkit';
import fredCategoriesApi from './fredCategories/api';
import { fredSeriesApi } from './rootApis';
import seriesObservations from './fredSeries/slice';

const combinedReducers = combineReducers({
  seriesObservations,
  fredCategoriesApi: fredCategoriesApi.reducer,
  fredSeriesApi: fredSeriesApi.reducer,
});

export default combinedReducers;
