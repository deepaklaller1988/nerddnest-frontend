import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url=process.env.NEXT_PUBLIC_API_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl:  `${url}v1/`,  
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
