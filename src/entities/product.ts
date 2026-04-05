export type TProductLastFetch = 'fetch' | 'search' | 'init'

export interface IProduct {
  id: number
  title: string
  category: string
  rating: number
  brand: string
  price: number
  sku: string
  description: string
  discountPercentage: number
  stock: number
  tags: string[]
  weight: number
  dimensions: IProductDimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: IProductReview[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: IProductMeta
  thumbnail: string
  images: string[]
}

export interface IProductMap {
  id: number
  title: string
  category: string
  rating: number
  brand: string
  price: number
  priceObj: {
    whole: string
    fractional: string
    cents: string
  }
  sku: string
}

interface IProductDimensions {
  width: number
  height: number
  depth: number
}

interface IProductReview {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

interface IProductMeta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export interface IProductData {
  products: IProduct[]
  total: number
  skip: number
  limit: number
}

export interface IProductFormCreation {
  title: string
  category: string
  rating?: number
  brand?: string
  price: number
  sku: string
  description?: string
}

export interface IProductRec {
  title: string
  category: string
  rating?: number
  brand?: string
  price: number
  sku: string
  description?: string
}

export interface IProductState {
  // filter: IProductFilter
  //   data: IProductData
  lastFetchType: TProductLastFetch
}

/**
 * CONSTANTS
 **/

export const PRODUCT_REC: IProductRec = {
  title: '',
  category: '',
  price: 0,
  sku: '',
}

export const PRODUCT_STATE: IProductState = {
  lastFetchType: 'init',
}

export const PRODUCT_SORT_DATA: ISorting[] = [
  {
    key: 'title',
    order: 'desc',
    isSort: true,
  },
  {
    key: 'priceObj',
    order: 'desc',
    isSort: false,
  },
  {
    key: 'rating',
    order: 'desc',
    isSort: false,
  },
  {
    key: 'brand',
    order: 'desc',
    isSort: false,
  },
  {
    key: 'sku',
    order: 'desc',
    isSort: false,
  },
]

export const PRODUCT_HEADERS: IHeader[] = [
  {
    key: 'title',
    title: 'Наименование',
    classes: 'col-span-4',
  },
  {
    key: 'brand',
    title: 'Вендор',
    classes: 'col-span-1 justify-center',
  },
  {
    key: 'sku',
    title: 'Артикул',
    classes: 'col-span-1 justify-center',
  },
  {
    key: 'rating',
    title: 'Оценка',
    classes: 'col-span-1 justify-center',
  },
  {
    key: 'priceObj',
    title: 'Цена',
    classes: 'col-span-1 justify-center',
  },
  {
    key: 'action',
    title: '',
    classes: 'col-span-3 justify-center',
  },
]
