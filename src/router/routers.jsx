/* eslint-disable react-refresh/only-export-components */
import PATH from '@/constants/path'
import { lazy } from 'react'
import { user } from '@/router/user.router'
import { auth } from '@/router/auth.router'
import { MainLayout } from '@/layouts/MainLayout'

const Page404 = lazy(() => import('@/pages/404/404'))
const Contact = lazy(() => import('@/pages/Contact/Contact'))
const CourseDetail = lazy(() => import('@/pages/CourseDetail/CourseDetail'))
const CourseRegister = lazy(() => import('@/pages/CourseRegister/CourseRegister'))
const Courses = lazy(() => import('@/pages/Courses/Courses'))
const About = lazy(() => import('@/pages/About/About'))
const HomePage = lazy(() => import('@/pages/HomePage/HomePage'))
const Payment = lazy(() => import('@/pages/Payment/Payment'))
const Projects = lazy(() => import('@/pages/Projects/Projects'))
const Team = lazy(() => import('@/pages/Team/Team'))
const Coin = lazy(() => import('@/pages/Coin/Coin'))

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
