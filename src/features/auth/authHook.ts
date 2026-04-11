import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setData as setDataAction, logout as logoutAction, setToken } from '@/features/auth/authSlice'
import { useLoginMutation, useRefreshMutation, useLazyMeQuery } from '@/api/authApi'
import type { RootState } from '@/features/store'

import type { IAuthRec, IAuthTokenRec, IAuth } from '@/entities/auth'

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
        dispatch(setDataAction(response))
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    [dispatch, authLogin]
  )

  const logout = useCallback(() => {
    dispatch(logoutAction())
  }, [dispatch])

  const setData = useCallback(
    (data: IAuth) => {
      dispatch(setDataAction(data))
    },
    [dispatch]
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
