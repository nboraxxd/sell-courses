import PATH from '@/constants/path'
import { MainLayout } from '@/layouts/MainLayout'
import { Page404 } from '@/pages/404'
import { Coin } from '@/pages/Coin'
import { Contact } from '@/pages/Contact'
import { CourseDetail } from '@/pages/CourseDetail'
import { CourseRegister } from '@/pages/CourseRegister'
import { Courses } from '@/pages/Courses'
import { About } from '@/pages/About'
import { HomePage } from '@/pages/HomePage'
import { Payment } from '@/pages/Payment'
import { Projects } from '@/pages/Projects'
import { Team } from '@/pages/Team'
import { user } from '@/router/user.router'
import { auth } from '@/router/auth.router'

export const routers = [
  {
    path: PATH.homePage,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },

      auth,

      {
        path: PATH.contact,
        element: <Contact />,
      },
      {
        path: PATH.courses,
        element: <Courses />,
      },
      {
        path: PATH.courseDetail,
        element: <CourseDetail />,
      },
      {
        path: PATH.courseRegister,
        element: <CourseRegister />,
      },
      {
        path: PATH.team,
        element: <Team />,
      },
      {
        path: PATH.projects,
        element: <Projects />,
      },
      {
        path: PATH.about,
        element: <About />,
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

      user,
    ],
  },
]
