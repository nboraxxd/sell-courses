import PATH from '@/constants/path'
import { UserLayout } from '@/layouts/UserLayout'
import { ChangePassword, Courses, Profile, Projects } from '@/pages/User'
import PrivateRouter from './PrivateRouter/PrivateRouter'

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
