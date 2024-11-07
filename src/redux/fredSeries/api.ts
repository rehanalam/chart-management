import { createApi } from '@reduxjs/toolkit/query/react';
import AxiosModule from '../../utils/modules/api';
import EnvModule from '../../utils/modules/env';
import { IObservationsSettingsFormValues } from 'src/components/AddChartModal';

export const fredSeriesApi = createApi({
  reducerPath: 'fredSeriesApi',
  baseQuery: AxiosModule.Utils.AxiosBaseQuery({ contextUrl: 'series' }),
  endpoints: (builder) => ({
    getFredSeries: builder.mutation<SeriesModule.IFredSeriesResponse, string>({
      query: (searchText) => ({
        method: 'GET',
        url: `/?search_text=${searchText}`,
      }),
    }),

    getFredObservationsById: builder.mutation<
      SeriesModule.IFredSeriesResponse,
      IObservationsSettingsFormValues
    >({
      query: (body) => ({
        method: 'POST',
        url: `/observations`,
        data: { ...body },
      }),
    }),
  }),
});

export const { useGetFredSeriesMutation, useGetFredObservationsByIdMutation } =
  fredSeriesApi;

export default fredSeriesApi;
