import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import rootReducer from '@/features/root/rootSlice'

import authReducer from '@/features/auth/authSlice'
import { authApi } from '@/api/authApi'

import productsReducer from '@/features/products/productsSlice'
import { productsApi } from '@/api/productsApi'

export const store = configureStore({
  reducer: {
    root: rootReducer,

    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,

    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
