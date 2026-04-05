// ProtectedRoute.tsx
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useSelector } from 'react-redux'
import type { RootState } from '@/features/store'
import { useAuth } from '@/features/auth/authHook'

type ProtectedRouteProps = {
  redirectPath?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/login' }) => {
  const { data: authData } = useAuth()
  const initialized = useSelector((state: RootState) => state.auth.initialized)

  console.log('🔍 ProtectedRoute:', { authData, initialized })
  console.log('authData', authData)

  // ← ЛОАДЕР ТОЛЬКО пока НЕ ИНИЦИАЛИЗИРОВАН!
  if (!initialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
        <span className="ml-2">Проверка авторизации...</span>
      </div>
    )
  }

  // ← После инициализации проверяем токен
  const hasAccessToken = !!authData?.accessToken
  console.log('🔍 hasAccessToken:', hasAccessToken)

  return hasAccessToken ? <Outlet /> : <Navigate to={redirectPath} replace />
}
