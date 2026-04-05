import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQuery'
import type { IProduct, IProductData, IProductRec } from '@/entities/product'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Products'],

  endpoints: (builder) => ({
    fetch: builder.query<IProductData, void>({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    search: builder.query<IProductData, string>({
      query: (description: string) => ({
        url: `/products/search?q=${description}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    create: builder.mutation<IProduct, IProductRec>({
      query: (body) => ({
        url: '/products/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),

    // update: builder.mutation<IProduct, { id: string; body: Partial<IProductRec> }>({
    //   query: ({ id, body }) => ({
    //     url: `/products/${id}`,
    //     method: 'PUT',
    //     body,
    //   }),
    //   invalidatesTags: ['Products'],
    // }),

    // delete: builder.mutation<void, string>({
    //   query: (id) => ({
    //     url: `/products/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Products'],
    // }),
  }),
})

export const { useLazyFetchQuery, useLazySearchQuery, useCreateMutation } = productsApi
