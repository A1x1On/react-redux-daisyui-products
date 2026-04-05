import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type TProductLastFetch, PRODUCT_STATE } from '@/entities/product'

export const productsSlice = createSlice({
  name: 'products',
  initialState: PRODUCT_STATE,
  reducers: {
    // setReset: (state) => {
    //   state.filter = { ...AUTH_FILTER }
    // },

    // setFilter: (state, action: PayloadAction<Partial<IAuthFilter>>) => {
    //   state.filter = { ...state.filter, ...action.payload }
    // },

    // setData: (state, action: PayloadAction<IProductData>) => {
    //   state.data = action.payload
    // },

    setLastFetchType: (state, action: PayloadAction<TProductLastFetch>) => {
      state.lastFetchType = action.payload
    },
  },
})

export const { setLastFetchType } = productsSlice.actions

export default productsSlice.reducer
