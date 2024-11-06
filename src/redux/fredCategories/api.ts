import { createApi } from '@reduxjs/toolkit/query/react';
import AxiosModule from '../../utils/modules/api';
import EnvModule from '../../utils/modules/env';

export const fredCategoriesApi = createApi({
  reducerPath: 'fredCategoriesApi',
  baseQuery: AxiosModule.Utils.AxiosBaseQuery({ contextUrl: `/category` }),
  endpoints: (builder) => ({
    getFredCategory: builder.query<Record<any, any>, void>({
      query: () => ({
        method: 'GET',
        url: `?category_id=125&api_key=${EnvModule.API_KEY}&file_type=json`,
      }),
    }),
    
  }),
});

export const { useGetFredCategoryQuery } = fredCategoriesApi;

export default fredCategoriesApi;
