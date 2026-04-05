import type { IAuth, IAuthRec, IAuthToken, IAuthTokenRec } from '@/entities/auth'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'

// const BASE_URL = `backend/auth`

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: BASE_URL,
  //   prepareHeaders: (headers) => {
  //     // Добавьте токены или другие заголовки если нужно
  //     return headers
  //   },
  // }),

  tagTypes: ['Auth'],

  endpoints: (builder) => ({
    login: builder.mutation<IAuth, IAuthRec>({
      query: (body: IAuthRec) => ({
        // headers: { 'Content-Type': 'application/json' },
        url: '/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    refresh: builder.mutation<IAuthToken, IAuthTokenRec>({
      query: (body: IAuthTokenRec) => ({
        // headers: { 'Content-Type': 'application/json' },
        url: '/refresh',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    me: builder.query<IAuth, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
  }),
})

export const { useLoginMutation, useRefreshMutation, useLazyMeQuery } = authApi
