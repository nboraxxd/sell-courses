/* eslint-disable react-refresh/only-export-components */
import PATH from '@/constants/path'
import { UserLayout } from '@/layouts/UserLayout'
import PrivateRouter from './PrivateRouter/PrivateRouter'
import { lazy } from 'react'

const ChangePassword = lazy(() => import('@/pages/User/ChangePassword/ChangePassword'))
const Courses = lazy(() => import('@/pages/User/Courses/Courses'))
const Profile = lazy(() => import('@/pages/User/Profile/Profile'))
const Projects = lazy(() => import('@/pages/User/Projects/Projects'))

export const user = {
  element: <PrivateRouter />,
  children: [
    {
      path: PATH.user.index,
      element: <UserLayout />,
      children: [
        {
          index: true,
          element: <Profile />,
        },
        {
          path: PATH.user.courses,
          element: <Courses />,
        },
        {
          path: PATH.user.projects,
          element: <Projects />,
        },
        {
          path: PATH.user.changePassword,
          element: <ChangePassword />,
        },
      ],
    },
  ],
}
