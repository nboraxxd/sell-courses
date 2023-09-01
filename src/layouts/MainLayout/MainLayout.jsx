import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { CourseRegister } from '@/pages/CourseRegister'
import { Footer } from '@/components/Footer'
import { Contact } from '@/pages/Contact'

export default function MainLayout() {
  return (
    <>
      <Header />
      <Sidebar />
      <CourseRegister />
      <Footer />
    </>
  )
}
