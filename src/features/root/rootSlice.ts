import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { formatBoolean } from '@/utils/general'

const initialState: IRootState = {
  isRemember: false,
}

const THEME_ATTRIBUTE = 'data-theme'

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setRemember: (state, action: PayloadAction<boolean>) => {
      state.isRemember = action.payload

      if (state.isRemember) {
        localStorage.setItem('isRemember', 'true')
      } else {
        localStorage.removeItem('isRemember')
      }
    },

    setUnloadTimeBeforeClosing: () => {
      window.addEventListener('beforeunload', () => {
        localStorage.setItem('unloadTime', Date.now().toString())
      })
    },

    handleClosedApp: (state) => {
      const lastUnload = parseInt(localStorage.getItem('unloadTime') || '0')
      const now = Date.now()
      const isRemember = formatBoolean(localStorage.getItem('isRemember'))

      if (now - lastUnload < 2000) {
        // less 2 sec = refresh
      } else {
        // more 2 sec = closed app
        localStorage.removeItem('unloadTime')

        if (!isRemember) {
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('access_token')
          window.location.replace('/')
        }
      }

      if (isRemember) state.isRemember = true
    },

    setTheme: () => {
      let theme = localStorage.getItem(THEME_ATTRIBUTE)
      if (!theme) {
        theme = 'light'
        localStorage.setItem(THEME_ATTRIBUTE, theme)
      }

      document.documentElement.setAttribute(THEME_ATTRIBUTE, theme)
    },
  },
})

export const { setRemember, setUnloadTimeBeforeClosing, handleClosedApp, setTheme } = rootSlice.actions

export default rootSlice.reducer
