import { createApi } from '@reduxjs/toolkit/query/react';
import AxiosModule from '../../utils/modules/api';
import EnvModule from '../../utils/modules/env';

export const fredCategoriesApi = createApi({
  reducerPath: 'fredCategoriesApi',
  baseQuery: AxiosModule.Utils.AxiosBaseQuery({ contextUrl: 'category' }),
  endpoints: (builder) => ({
    getFredCategory: builder.query<Record<any, any>, void>({
      query: () => ({
        method: 'GET',
        url: `/`,
      }),
    }),

    getFredCategoryChildren: builder.query<Record<any, any>, void>({
      query: () => ({
        method: 'GET',
        url: `/children`,
      }),
    }),

    getFredCategoryRelated: builder.query<Record<any, any>, void>({
      query: () => ({
        method: 'GET',
        url: `/related`,
      }),
    }),
  }),
});

export const {
  useGetFredCategoryQuery,
  useGetFredCategoryChildrenQuery,
  useGetFredCategoryRelatedQuery,
} = fredCategoriesApi;

export default fredCategoriesApi;
