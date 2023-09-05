import { useRoutes } from 'react-router-dom'
import { routers } from '@/router'
import { Toaster } from 'sonner'

export default function App() {
  const element = useRoutes(routers)

  return (
    <>
      {element}
      <Toaster richColors position="top-center" offset="75px" />
    </>
  )
}
