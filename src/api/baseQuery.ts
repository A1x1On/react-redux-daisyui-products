import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

import { logout, setToken } from '@/features/auth/authSlice'
import { authApi } from '@/api/authApi'
import { router } from '@/app/router'
import { AUTH_REFRESH_EXP_MINS } from '@/entities/auth'

const BASE_URL = import.meta.env.PROD ? import.meta.env.VITE_BACKEND : import.meta.env.VITE_BACKEND_ENDPOINT

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
      headers.set('Content-Type', 'application/json')
    }
    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    try {
      const tokens = await api
        .dispatch(
          authApi.endpoints.refresh.initiate({
            refreshToken: localStorage.getItem('refresh_token') || '',
            expiresInMins: AUTH_REFRESH_EXP_MINS,
          })
        )
        .unwrap()

      api.dispatch(setToken(tokens))

      result = await rawBaseQuery(args, api, extraOptions)
    } catch {
      api.dispatch(logout())
      router.navigate('/login', { replace: true })
    }
  }

  return result
}
