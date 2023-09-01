import PATH from '@/constants/path'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { Courses } from '@/pages/Courses'
import { Team } from '@/pages/Team'
import { Contact } from '@/pages/Contact'
import { Project } from '@/pages/Project'
import { FAQ } from '@/pages/FAQ'
import { Payment } from '@/pages/Payment'
import { Coin } from '@/pages/Coin'
import Register from '@/pages/Register/Register'
import { Login } from '@/pages/Login'
import { ResetPassword } from '@/pages/ResetPassword'
import Page404 from '@/pages/404/404'

export const routers = [
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: PATH.register,
        element: <Register />,
      },
      {
        path: PATH.login,
        element: <Login />,
      },
      {
        path: PATH.resetPassword,
        element: <ResetPassword />,
      },
      {
        path: PATH.contact,
        element: <Contact />,
      },
      {
        path: PATH.courses,
        element: <Courses />,
      },
      {
        path: PATH.team,
        element: <Team />,
      },
      {
        path: PATH.project,
        element: <Project />,
      },
      {
        path: PATH.faq,
        element: <FAQ />,
      },
      {
        path: PATH.payment,
        element: <Payment />,
      },
      {
        path: PATH.coin,
        element: <Coin />,
      },
      {
        path: PATH.page404,
        element: <Page404 />,
      },
    ],
  },
]
