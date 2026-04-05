import { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { useLazyFetchQuery, useLazySearchQuery, useCreateMutation } from '@/api/productsApi'
import { setLastFetchType } from './productsSlice'

import type { IProductRec } from '@/entities/product'

export const useProducts = () => {
  const dispatch = useDispatch()

  const [productsFetch, { data, isFetching }] = useLazyFetchQuery()

  const [productsSearch, { data: dataSearch, isFetching: isFetchingSearch }] = useLazySearchQuery()
  const [productsCreate, { isLoading: isLoadingCreate }] = useCreateMutation()

  const fetch = useCallback(async () => {
    try {
      await productsFetch().unwrap()

      dispatch(setLastFetchType('fetch'))
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  }, [dispatch, productsFetch])

  const search = useCallback(
    async (description: string) => {
      try {
        if (description) {
          await productsSearch(description).unwrap()
          dispatch(setLastFetchType('search'))
        } else {
          await productsFetch().unwrap()
          dispatch(setLastFetchType('fetch'))
        }
      } catch (error) {
        console.error('Search error:', error)
        throw error
      }
    },
    [dispatch, productsSearch, productsFetch]
  )

  const create = useCallback(
    async (record: IProductRec) => {
      try {
        await productsCreate(record).unwrap()
      } catch (error) {
        console.error('Product Insert error:', error)
        throw error
      }
    },
    [productsCreate]
  )

  const isLoading = useMemo(() => {
    return isFetching || isFetchingSearch || isLoadingCreate
  }, [isFetching, isFetchingSearch, isLoadingCreate])

  return {
    isLoading,
    data,
    dataSearch,

    fetch,
    search,
    create,
  }
}
