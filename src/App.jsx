import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { routers } from '@/router'
import { Toaster } from 'sonner'

export default function App() {
  const element = useRoutes(routers)
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  return (
    <>
      {element}
      <Toaster richColors position="top-center" offset="75px" duration={2500} />
    </>
  )
}
