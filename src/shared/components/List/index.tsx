import { useEffect, Fragment } from 'react'

import clsx from 'clsx'
import styles from '@/shared/components/List/index.module.scss'

import { RCheckbox } from '@/shared/controls/RCheckbox'

interface IPropsComponent<T> {
  items: T[]
  selectedItems: Set<number>
  headers: IHeader[]
  page: number
  pageSize: number

  sorting: ISorting[]
  isLoading: boolean
  isSelectAll: boolean
  //   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setSorting: React.Dispatch<React.SetStateAction<ISorting[]>>
  setIsSelectAll: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedItems: React.Dispatch<React.SetStateAction<Set<number>>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  onChanged?: (ids: number[]) => void
  onSortChanged?: (key: string) => void
  renderItem: (
    item: T,
    options: {
      isSelected: boolean
      toggleItem: () => void
    }
  ) => React.ReactNode
}

export const List = <T extends { id: number }>({
  items,
  selectedItems = new Set(),
  headers,
  page = 1,
  pageSize = 50,
  sorting,
  isLoading,
  isSelectAll,
  //   setIsLoading,
  setSorting,
  setIsSelectAll,
  setSelectedItems,
  setPage,
  onChanged,
  //   onSortChanged,
  renderItem,
}: IPropsComponent<T>) => {
  const totalPages = Math.ceil(items.length / pageSize)
  const startIndex = (page - 1) * pageSize
  const lastIndex = startIndex + pageSize
  const itemsPerPage = items.slice(startIndex, lastIndex)

  useEffect(() => {
    // setIsLoading(true)
    setTimeout(() => {
      //   setIsLoading(false)
    }, 1000)
  }, [])

  const onToggleItem = (id: number) => {
    setSelectedItems((ids: Set<number>) => {
      const items = new Set(ids)
      if (items.has(id)) {
        items.delete(id)
      } else {
        items.add(id)
      }

      return items
    })
  }

  const onToggleAllItems = (value: boolean) => {
    setIsSelectAll(value)

    if (value) {
      setSelectedItems(new Set(itemsPerPage.map((item) => item.id)))
    } else {
      setSelectedItems(new Set())
    }
  }

  const onChange = () => {
    onChanged?.([2, 3])
  }

  const onSort = (key: string) => {
    if (!sorting?.length) return

    setSorting(
      sorting.map((item: ISorting) => {
        item.isSort = false
        if (key === item.key) {
          item.order = item.order === 'desc' ? 'asc' : 'desc'
          item.isSort = true
        }

        return item
      })
    )
  }

  return (
    <>
      {isLoading ? (
        <div className={clsx(styles.list, 'pt-20 flex justify-center')}>
          <span className="loading loading-spinner mb-20"></span> {/* ЗАГРУЗКА */}
        </div>
      ) : (
        <div className={clsx(styles.list, 'p-7')}>
          {/* КОЛОНКИ */}
          <div className={clsx(styles.listHeaders)}>
            <div
              className={clsx(
                styles.listHeadersHeader,
                'grid',
                isSelectAll !== undefined ? 'grid-cols-[50px_repeat(11,_minmax(0,_1fr))]' : 'grid-cols-12'
              )}
            >
              {/* ВЫБОР ВСЕХ */}
              {isSelectAll !== undefined && (
                <div className={clsx(styles.listHeadersHeaderCol, 'text-center')}>
                  <RCheckbox checked={isSelectAll} onChangeValue={onToggleAllItems} />
                </div>
              )}

              {/* ЗАГОЛОВКИ */}
              {headers.map((header: IHeader) => {
                return (
                  <div
                    key={header.key}
                    className={clsx(
                      styles.listHeadersHeaderCol,
                      header.classes,
                      sorting?.length && 'cursor-pointer hover-opacity'
                    )}
                    onClick={() => onSort(header.key)}
                  >
                    {header.title}
                  </div>
                )
              })}
            </div>
          </div>

          {!isLoading && !items.length && (
            <div className="m-auto py-7 text-center">По текущему запросу не один товар не найден</div>
          )}

          {/* СПИСОК ЭЛЕМЕНТОВ */}
          <div className={clsx(styles.listItems)}>
            {itemsPerPage.map((item) => (
              <Fragment key={item.id}>
                {renderItem(item, {
                  isSelected: selectedItems.has(item.id),
                  toggleItem: () => onToggleItem(item.id),
                })}
              </Fragment>
            ))}
          </div>

          {/* ПАГИНАЦИЯ */}
          <div className={clsx(styles.listPagination, 'grid grid-cols-3')}>
            {/* ИНФО ОБЩЕГО КОЛИЧЕСТВА СТРАНИЦ */}
            <div className={clsx(styles.listPaginationInfo)}>
              <span>Показано</span>
              <span className="ml-1">{startIndex + 1}</span>
              <span className="ml-1">-</span>
              <span className="ml-1">{Math.min(startIndex + pageSize, items.length)}</span>
              <span className="ml-1">из</span>
              <span className="ml-1">{items.length}</span>
            </div>

            <div></div>

            <div className={clsx(styles.listPaginationPaging, 'grid grid-cols-12')}>
              <div className={clsx(styles.listPaginationPagingItems, 'col-span-8 grid grid-cols-5')}>
                {/* ← */}
                <button
                  className={clsx(styles.listPaginationPagingItemsLeftItem, 'col-span-2')}
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                />

                {/* 1,2,3,4 ... */}
                {[...Array(totalPages)].map((_, i) => {
                  const p = i + 1
                  return (
                    <button
                      key={p}
                      className={clsx(
                        styles.listPaginationPagingItemsItem,
                        page === p && styles.listPaginationPagingItemsItemActive
                      )}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  )
                })}

                {/* → */}
                <button
                  className={clsx(styles.listPaginationPagingItemsRightItem, 'col-span-2')}
                  onClick={() => setPage(totalPages)}
                  disabled={page === totalPages}
                />
              </div>
            </div>
          </div>

          {/* EMIT КНОПКА */}
          {onChanged && (
            <div>
              <button onClick={onChange}>Сохранить</button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
