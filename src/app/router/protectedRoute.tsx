import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useSelector } from 'react-redux'
import type { RootState } from '@/features/store'
import { useAuth } from '@/features/auth/authHook'

export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ redirectPath = '/login' }) => {
  const { data: authData } = useAuth()
  const initialized = useSelector((state: RootState) => state.auth.initialized)

  // loader
  if (!initialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
        <span className="ml-2">Проверка авторизации...</span>
      </div>
    )
  }

  const hasAccessToken = !!authData?.accessToken

  return hasAccessToken ? <Outlet /> : <Navigate to={redirectPath} replace />
}
