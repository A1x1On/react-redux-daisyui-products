import { useEffect, useMemo, useState, useCallback, lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'

import clsx from 'clsx'
import styles from './index.module.scss'

import { formatMoneyByParts, showToast } from '@/utils/general'

import { useAuth } from '@/features/auth/authHook'
import { useProducts } from '@/features/products/productsHook'

import { RCheckbox } from '@/shared/controls/RCheckbox'

import { List } from '@/shared/components/List'
import list from '@/shared/components/List/index.module.scss'

const DialogCreate = lazy(() => import('./create'))

import type { RootState /** AppDispatch **/ } from '@/features/store'
import {
  type IProduct,
  type IProductMap,
  type IProductRec,
  PRODUCT_SORT_DATA,
  PRODUCT_HEADERS,
} from '@/entities/product'

const PAGE_SIZE = 5
const PAGE = 1

const Products = () => {
  const { getMe } = useAuth()
  const { fetch, search, create, isLoading, data, dataSearch } = useProducts()

  const productsState = useSelector((state: RootState) => state.products)

  const [isSelectAll, setIsSelectAll] = useState(false)
  const [page, setPage] = useState(PAGE)
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())

  const [descriptionSearch, setDescriptionSearch] = useState<string | undefined>()
  const [showCreation, setShowCreation] = useState(false)

  const [sorting, setSorting] = useState<ISorting[]>(() => {
    const storageSorting = localStorage.getItem('sorting')
    const arrSorting = storageSorting ? JSON.parse(storageSorting) : []
    return arrSorting.length ? arrSorting : PRODUCT_SORT_DATA
  })

  const onRefresh = async () => {
    await fetch()
    setPage(PAGE)
  }

  const getMappedPrice = useCallback((data: number) => formatMoneyByParts(data), [])

  const onShowCreation = () => setShowCreation(true)

  const onCreate = async (record: IProductRec) => {
    await create(record)
      .then(() => showToast('alert-success', 'Продукт создан успешно!'))
      .catch((error: ErrorEvent) => showToast('alert-error', error))
  }

  useEffect(() => {
    console.log('selectedItems', [...selectedItems])
  }, [selectedItems])

  useEffect(() => {
    if (descriptionSearch === undefined) return

    const t = setTimeout(() => {
      return search(descriptionSearch)
    }, 800)

    return () => clearTimeout(t)
  }, [descriptionSearch, search])

  useEffect(() => {
    localStorage.setItem('sorting', JSON.stringify(sorting))
  }, [sorting])

  const products = useMemo(() => {
    return (productsState.lastFetchType == 'search' ? dataSearch?.products : data?.products) || []
  }, [productsState.lastFetchType, dataSearch, data])

  const items = useMemo(() => {
    return products.map((product: IProduct) => {
      return {
        ...product,
        priceObj: getMappedPrice(product.price),
      } as IProductMap
    })
  }, [products, getMappedPrice])

  const sortedItems = useMemo(() => {
    const found = sorting.find((sort: ISorting) => sort.isSort === true)

    return [...items].sort((a: IProductMap, b: IProductMap) => {
      if (found?.key === 'title' || found?.key === 'brand' || found?.key === 'sku') {
        const valueA = a[found.key]
        const valueB = b[found.key]
        const cmp = String(valueA).localeCompare(String(valueB))

        return found.order === 'desc' ? -cmp : cmp
      }

      if (found?.key === 'rating') {
        const valueA = a[found.key]
        const valueB = b[found.key]
        return found.order === 'desc' ? valueB - valueA : valueA - valueB
      }

      if (found?.key === 'priceObj') {
        const valueA = a.price
        const valueB = b.price
        return found.order === 'desc' ? valueB - valueA : valueA - valueB
      }

      return a.title.localeCompare(b.title)
    })
  }, [sorting, items])

  const mounted = async () => {
    await fetch()
    await getMe()
  }

  useEffect(() => {
    mounted()
  }, [])

  return (
    <div>
      {/* FILTER */}
      <div className="bg-white my-7">
        <div className={clsx(styles.filterSearch, 'grid grid-cols-12')}>
          <div className="col-span-1 fs-title-2 px-7 flex items-center ">Товары</div>

          <div className="col-span-10 flex items-center">
            <label className={clsx(styles.filterSearchField, 'input m-auto')}>
              <img src="./src/assets/icons/search.svg" alt="Поиск" />
              <input
                type="search"
                required
                placeholder="Найти"
                value={descriptionSearch || ''}
                onChange={(e) => setDescriptionSearch(e.target.value)}
              />
            </label>
          </div>

          <div className="col-span-1"></div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="bg-white">
        <div className="grid grid-cols-12 py-8">
          <div className="col-span-3 fs-title-2 px-7 flex items-center">Все позиции</div>

          <div className="col-span-6 flex items-center"></div>

          <div className="col-span-3 px-7 flex items-center justify-end ">
            <button className="btn btn-square btn-outline mr-3" onClick={onRefresh}>
              <img src="./src/assets/icons/arrows-clockwise.svg" alt="Re" />
            </button>

            <button className="btn btn-primary" onClick={onShowCreation}>
              <img src="./src/assets/icons/plus-outline.svg" alt="Добавить" />
              Добавить
            </button>
          </div>
        </div>

        <List
          items={sortedItems}
          selectedItems={selectedItems}
          headers={PRODUCT_HEADERS}
          page={page}
          pageSize={PAGE_SIZE}
          isLoading={isLoading}
          isSelectAll={isSelectAll}
          setIsSelectAll={setIsSelectAll}
          setSelectedItems={setSelectedItems}
          setPage={setPage}
          sorting={sorting}
          setSorting={setSorting}
          renderItem={(item, { isSelected, toggleItem }) => (
            <div
              className={clsx(
                list.listItemsItem,
                'grid grid-cols-[50px_repeat(11,_minmax(0,_1fr))]',
                isSelected && styles.listRowSelected
              )}
            >
              <div className={clsx(list.listItemsItemCol, 'text-center')}>
                <RCheckbox checked={isSelected} onChange={toggleItem} />
              </div>

              <div className={clsx(list.listItemsItemCol, 'col-span-4')}>
                <div className="float-left, w-100">
                  <div className={clsx([list.listItemsItemCol, styles.listRowTitlePic], 'col-span-4')}>
                    <img className="w-100" src="./src/assets/icons/search.svg" alt="Добавить" />
                  </div>

                  <div className="flex flex-col">
                    <span className={clsx(styles.listRowTitleText)}>{item.title}</span>

                    <span className={clsx(styles.listRowTitleSub)}>{item.category}</span>
                  </div>
                </div>
              </div>

              <div className={clsx(list.listItemsItemCol, 'col-span-1 justify-center text-center')}>{item.brand}</div>

              <div className={clsx(list.listItemsItemCol, 'col-span-1 justify-center text-center')}>{item.sku}</div>

              <div className={clsx(list.listItemsItemCol, 'col-span-1 justify-center text-center')}>{item.rating}</div>

              <div className={clsx(list.listItemsItemCol, 'col-span-1 justify-center text-center')}>
                <span>{item.priceObj.whole}</span>

                {item.priceObj.fractional && <span className="ml-2">{item.priceObj.fractional}</span>}

                <span className="text-color-4">,{item.priceObj.cents}</span>
              </div>

              <div className={clsx(list.listItemsItemCol, 'col-span-3 justify-center')}>
                <button className="btn btn-mini btn-square btn-primary mr-3">
                  <img src="./src/assets/icons/plus.svg" alt="Re" />
                </button>

                <button className="btn btn-circle btn-outline border-none bg-inherit hover-opacity">
                  <img src="./src/assets/icons/dots-three-circle.svg" alt="Re" />
                </button>
              </div>
            </div>
          )}
        />
      </div>

      <div id="toast-container" className="toast toast-end z-50"></div>

      <Suspense fallback={<span className="loading loading-spinner loading-md" />}>
        {showCreation && <DialogCreate show={showCreation} setShow={setShowCreation} onChanged={onCreate} />}
      </Suspense>
    </div>
  )
}

export default Products
