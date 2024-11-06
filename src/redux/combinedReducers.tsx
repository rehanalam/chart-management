
import { combineReducers } from '@reduxjs/toolkit';
import fredCategoriesApi from './fredCategories/api';

const combinedReducers = combineReducers({
  fredApi: fredCategoriesApi.reducer
  // api: api.reducer
});

export default combinedReducers;
