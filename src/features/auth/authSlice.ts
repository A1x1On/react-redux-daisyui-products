import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type IAuth, type IAuthToken, AUTH_STATE } from '@/entities/auth'

export const authSlice = createSlice({
  name: 'auth',
  initialState: AUTH_STATE,
  reducers: {
    loadToken: (state) => {
      try {
        const accessToken = localStorage.getItem('access_token')
        const refreshToken = localStorage.getItem('refresh_token')

        state.token = accessToken
        if (accessToken && refreshToken) {
          state.data = {
            ...state.data,
            accessToken,
            refreshToken,
          } as IAuth
        }

        state.initialized = true
      } catch {
        state.token = null
        state.initialized = true
      }
    },

    setToken: (state, action: PayloadAction<IAuth | IAuthToken>) => {
      state.initialized = true
      localStorage.setItem('access_token', action.payload.accessToken)
      localStorage.setItem('refresh_token', action.payload.refreshToken)
    },

    clearToken: (state) => {
      state.token = null
      state.data = null
      localStorage.removeItem('access_token')
    },

    setData: (state, action: PayloadAction<IAuth>) => {
      state.data = action.payload
    },

    logout: (state) => {
      state.data = null
      state.token = null
      state.initialized = true

      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },
  },
})

export const { setData, loadToken, setToken, logout, clearToken } = authSlice.actions

export default authSlice.reducer
