import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'

import RootLayout from '@/shared/layout/RootLayout'

import { LoginPage } from '@/pages/login'

import Products from '@/pages/products/index'
import ProductDetail from '@/pages/products/$id'

import { ProtectedRoute } from './protectedRoute'

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Navigate to="/products" replace /> },
          { path: 'products', element: <Products /> },
          { path: 'products/:id', element: <ProductDetail /> },
        ],
      },
    ],
  },
]

// Добавляем страницу 404 для всех несуществующих маршрутов
const routesWithNotFound: RouteObject[] = [
  ...routes,
  {
    path: '*',
    lazy: async () => {
      const { NotFound } = await import('@/app/notFound')
      return { element: <NotFound /> }
    },
  },
]

export const router = createBrowserRouter(routesWithNotFound)
