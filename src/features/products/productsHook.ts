import { useCallback, useMemo } from 'react'

import { useDispatch } from 'react-redux'
// import type { RootState, AppDispatch } from '@/features/store'

import { useLazyFetchQuery, useLazySearchQuery, useCreateMutation } from '@/api/productsApi'

import {
  // setReset,
  // setFilter,
  // setParams,
  // setData,
  setLastFetchType,
} from './productsSlice'
import type { IProductRec } from '@/entities/product'

export const useProducts = () => {
  const dispatch = useDispatch()
  // const productsState = useSelector((state: RootState) => state.products)

  const [
    productsFetch,
    {
      data,
      // isLoading,
      isFetching,
      // isError,
      // error,
    },
  ] = useLazyFetchQuery()
  // const { data, isLoading, refetch, isFetching, isSuccess, isError, error } = useGetNotesQuery() // автоматическая загрузка
  // // Можно добавить fetch если все же нужен
  // const fetch = useCallback(async () => {
  //   return await refetch().unwrap()
  // }, [refetch])

  const [productsSearch, { data: dataSearch, isFetching: isFetchingSearch }] = useLazySearchQuery()
  const [productsCreate, { isLoading: isLoadingCreate }] = useCreateMutation()

  //   const [insertNotes, {
  //   isLoading,      // Выполняется ли мутация
  //   isError,        // Была ли ошибка
  //   error,          // Объект ошибки
  //   isSuccess,      // Успешно ли завершилась
  //   reset,          // Сбросить состояние мутации
  // }] = useInsertNotesMutation();

  const fetch = useCallback(async () => {
    try {
      await productsFetch().unwrap()
      // dispatch(setData(response))

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
