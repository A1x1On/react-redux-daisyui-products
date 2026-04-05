import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setData, logout, setToken } from '@/features/auth/authSlice'
import { useLoginMutation, useRefreshMutation, useLazyMeQuery } from '@/api/authApi'
import type { RootState } from '@/features/store'

import type { IAuthRec, IAuthTokenRec } from '@/entities/auth'

export const useAuth = () => {
  const dispatch = useDispatch()
  const authState = useSelector((state: RootState) => state.auth)

  const [authLogin, { isLoading }] = useLoginMutation()
  const [authRefresh] = useRefreshMutation()
  const [authGetMe] = useLazyMeQuery()

  const login = useCallback(
    async (record: IAuthRec) => {
      try {
        const response = await authLogin(record).unwrap()

        dispatch(setToken(response))
        dispatch(setData(response))
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    [dispatch, authLogin]
  )

  const refresh = useCallback(
    async (record: IAuthTokenRec) => {
      try {
        const response = await authRefresh(record).unwrap()

        dispatch(setToken(response))
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    [dispatch, authRefresh]
  )

  const getMe = useCallback(async () => {
    try {
      await authGetMe().unwrap() // to do: setMe
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }, [authGetMe])

  return {
    isLoading,
    data: authState.data,

    logout,
    setData,

    login,
    refresh,
    getMe,
  }
}
