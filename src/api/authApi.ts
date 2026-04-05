import type { IAuth, IAuthRec, IAuthToken, IAuthTokenRec } from '@/entities/auth'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,

  tagTypes: ['Auth'],

  endpoints: (builder) => ({
    login: builder.mutation<IAuth, IAuthRec>({
      query: (body: IAuthRec) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    refresh: builder.mutation<IAuthToken, IAuthTokenRec>({
      query: (body: IAuthTokenRec) => ({
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
