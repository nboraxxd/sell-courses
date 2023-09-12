/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import PATH from '@/constants/path'
import AuthRouter from './AuthRouter/AuthRouter'

const Register = lazy(() => import('@/pages/Register/Register'))
const Login = lazy(() => import('@/pages/Login/Login'))
const ResetPassword = lazy(() => import('@/pages/ResetPassword/ResetPassword'))


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
