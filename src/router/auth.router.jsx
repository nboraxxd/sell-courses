import PATH from '@/constants/path'
import AuthRouter from './AuthRouter/AuthRouter'
import { Register } from '@/pages/Register'
import { Login } from '@/pages/Login'
import { ResetPassword } from '@/pages/ResetPassword'

export const auth = {
  element: <AuthRouter />,
  children: [
    {
      path: PATH.register,
      element: <Register />,
    },
    {
      path: PATH.signin,
      element: <Login />,
    },
    {
      path: PATH.resetPassword,
      element: <ResetPassword />,
    },
  ],
}
