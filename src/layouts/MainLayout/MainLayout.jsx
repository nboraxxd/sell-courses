import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Contact } from '@/pages/Contact'
import { Footer } from '@/components/Footer'

export default function MainLayout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Contact />
      <Footer />
    </>
  )
}
