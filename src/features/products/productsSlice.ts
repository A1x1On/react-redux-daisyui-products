import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type TProductLastFetch, PRODUCT_STATE } from '@/entities/product'

export const productsSlice = createSlice({
  name: 'products',
  initialState: PRODUCT_STATE,
  reducers: {
    setLastFetchType: (state, action: PayloadAction<TProductLastFetch>) => {
      state.lastFetchType = action.payload
    },
  },
})

export const { setLastFetchType } = productsSlice.actions

export default productsSlice.reducer
