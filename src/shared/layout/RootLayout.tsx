import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div>
      <header></header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
