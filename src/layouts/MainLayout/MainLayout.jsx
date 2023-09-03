import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Footer } from '@/components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

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
      <Outlet />
      <Footer />
    </>
  )
}
