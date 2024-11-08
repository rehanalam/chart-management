import { createApi } from '@reduxjs/toolkit/query/react';
import AxiosModule from '../../utils/modules/api';
import EnvModule from '../../utils/modules/env';
import { IObservationsSettingsFormValues } from 'src/components/AddChartModal';

export const fredSeriesApi = createApi({
  reducerPath: 'fredSeriesApi',
  baseQuery: AxiosModule.Utils.AxiosBaseQuery({ contextUrl: 'series' }),
  endpoints: (builder) => ({
    getFredSeries: builder.query<SeriesModule.IFredSeriesResponse, string>({
      query: (seriesId) => ({
        method: 'GET',
        url: `/?series_id=${seriesId}`,
      }),
    }),

    searchFredSeries: builder.query<SeriesModule.IFredSeriesResponse, string>({
      query: (searchText) => ({
        method: 'GET',
        url: `/search/?search_text=${searchText}`,
      }),
    }),

    getFredObservationsById: builder.mutation<
      SeriesModule.IObservationResponse,
      SeriesModule.IObservationPayload
    >({
      query: (body) => ({
        method: 'POST',
        url: `/observations`,
        data: { ...body },
      }),
    }),
  }),
});

export const {
  useGetFredSeriesQuery,
  useLazySearchFredSeriesQuery,
  useGetFredObservationsByIdMutation,
} = fredSeriesApi;

export default fredSeriesApi;
