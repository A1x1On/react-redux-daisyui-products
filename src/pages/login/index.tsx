import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EyeIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import styles from './index.module.scss'

import { showToast } from '@/utils/general'

import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@/features/store'
import { setRemember } from '@/features/root/rootSlice'
import { useAuth } from '@/features/auth/authHook'

import { RCheckbox } from '@/shared/controls/RCheckbox'

import { type IAuthRec, AUTH_REC, AUTH_LOGIN_EXP_MINS } from '@/entities/auth'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const root = useSelector((state: RootState) => state.root)
  const { login, isLoading } = useAuth()

  const [credentials, setCredentials] = useState<IAuthRec>(AUTH_REC)
  const [showPassword, setShowPassword] = useState(false)

  const onLogin = async () => {
    if (isLoading) return

    const { username, password } = credentials

    await login({ username, password, expiresInMins: AUTH_LOGIN_EXP_MINS })
      .then(() => navigate('/products', { replace: true }))
      .catch((error: ErrorEvent) => showToast('alert-error', error))
  }

  const onLoginByEnter = async (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') onLogin()
  }

  useEffect(() => {
    console.log('MOUNTED')
  }, [])

  return (
    <div className={clsx(styles.login)}>
      <div className={clsx(styles.loginWrapper)}>
        <div className={clsx(styles.loginWrapperBackground)}>
          <div className={clsx(styles.loginForm)}>
            <div className={clsx(styles.loginFormLogo)}></div>
            <div className={clsx(styles.loginFormTitle)}>Добро пожаловать!</div>
            <div className={clsx(styles.loginFormSubtitle)}>Пожалуйста, авторизуйтесь</div>

            <div className="w-full">
              <label className="label">
                <span className={clsx(styles.loginFormLabel)}>Логин</span>
              </label>

              <div className="relative">
                <img className={clsx(styles.loginFormIconUser)} src="/icons/user.svg" />

                <input
                  className="input-md input-bordered w-full pl-12 pr-12"
                  type="text"
                  value={credentials.username}
                  placeholder="Введите имя пользователя"
                  onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                  onKeyDown={onLoginByEnter}
                />

                {credentials.username && (
                  <button
                    type="button"
                    className={clsx(styles.loginFormInputClear)}
                    onClick={() => setCredentials((prev) => ({ ...prev, username: '' }))}
                  >
                    <img src="/icons/cross.svg" />
                  </button>
                )}
              </div>
            </div>

            <div className="w-full">
              <label className="label">
                <span className={clsx(styles.loginFormLabel)}>Пароль</span>
              </label>

              <div className="relative">
                <img className={clsx(styles.loginFormIconLock)} src="/icons/lock.svg" />

                <input
                  className="input-md input-bordered w-full pl-12 pr-12"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Введите пароль"
                  onKeyDown={onLoginByEnter}
                />

                <button
                  type="button"
                  className={clsx(styles.loginFormInputEye)}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeIcon className="w-5 h-5" />
                  ) : (
                    <img className="w-5 h-5" src="/icons/eye-off.svg" />
                  )}
                </button>
              </div>

              <div className="w-full flex items-center mt-6">
                <RCheckbox className="mr-2" checked={root.isRemember} onChangeValue={(d) => dispatch(setRemember(d))} />

                <span className={clsx(styles.loginFormRemember)}>Запомнить данные</span>
              </div>
            </div>

            <div className="flex w-full mt-7">
              <button
                className={clsx(styles.loginFormEnter, 'btn btn-primary', isLoading && 'opacity-50')}
                onClick={onLogin}
              >
                Войти
                {isLoading && (
                  <div className="ml-2">
                    <span className="loading loading-spinner"></span>
                  </div>
                )}
              </button>
            </div>

            <div className="w-full flex justify-center mt-3">
              <div className={clsx(styles.loginFormSideLine)}></div>
              <div className={clsx(styles.loginFormMiddleText)}>или</div>
              <div className={clsx(styles.loginFormSideLine)}></div>
            </div>

            <div className={clsx(styles.loginFormSignUp, 'w-full flex justify-center mt-6')}>
              <span className="mr-1">Нет аккаунта?</span>
              <a href="javascript:void(0)">Создать</a>
            </div>
          </div>
        </div>
      </div>

      <div id="toast-container" className="toast toast-end z-50" />
    </div>
  )
}
