import combinedReducers from './combinedReducers';

import AxiosModule from '../utils/modules/api';
import type { Action, ThunkAction, ThunkMiddleware } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { fredCategoriesApi, fredSeriesApi } from './rootApis';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

export type StoreState = ReturnType<typeof combinedReducers>;
const persistedReducer = persistReducer<StoreState>(
  persistConfig,
  combinedReducers
);

const middlewares: ThunkMiddleware[] = [
  fredCategoriesApi.middleware,
  fredSeriesApi.middleware,
];
export const purgePersistedState = () => persistedStore.purge();

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
// export const makeStore = (preloadedState?: Partial<StoreState>) => {
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Redux persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),

  // preloadedState,
});

// inject store to api
AxiosModule.Utils.injectStore(store);

export const persistedStore = persistStore(store);

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  StoreState,
  unknown,
  Action
>;
