import { combineReducers } from '@reduxjs/toolkit';
import fredCategoriesApi from './fredCategories/api';
import { fredSeriesApi } from './rootApis';

const combinedReducers = combineReducers({
  fredCategoriesApi: fredCategoriesApi.reducer,
  fredSeriesApi: fredSeriesApi.reducer,
  // api: api.reducer
});

export default combinedReducers;
