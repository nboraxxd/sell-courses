import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Footer } from '@/components/Footer'
import { SuspenseLoading } from '@/components/SuspenseLoading'

export default function MainLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    handleCloseSidebar()
  }, [pathname])

  function handleToggleSidebar() {
    document.body.classList.toggle('menu-is-show')
  }

  function handleCloseSidebar() {
    document.body.classList.remove('menu-is-show')
  }

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <Sidebar handleCloseSidebar={handleCloseSidebar} />
      <Suspense fallback={<SuspenseLoading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  )
}
