import PATH from '@/constants/path'
import { UserLayout } from '@/layouts/UserLayout'
import { ChangePassword, Courses, Profile, Projects } from '@/pages/User'

export const user = {
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
}
