import { useLayoutEffect } from 'react'
import { router } from '@/app/router'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

// styles
import '@/styles/tailwind.css'
import '@/styles/variables.scss'
import '@/styles/styles.scss'

// stores
import { Provider, useDispatch } from 'react-redux'
import { store } from '@/features/store'
import { setTheme, setUnloadTimeBeforeClosing, handleClosedApp } from '@/features/root/rootSlice'
import { loadToken } from '@/features/auth/authSlice'

export const AppContent = () => {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    // before refresh
    dispatch(setUnloadTimeBeforeClosing())

    // after refresh
    dispatch(handleClosedApp())

    // set localStorage data to auth store
    dispatch(loadToken())

    // theme switcher data
    dispatch(setTheme())
  }, [dispatch])

  return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <AppContent />
    {/* </React.StrictMode> */}
  </Provider>
)
