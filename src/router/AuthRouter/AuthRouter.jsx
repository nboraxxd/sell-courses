import PATH from '@/constants/path'
import { AuthContext } from '@/contexts/auth.context'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function AuthRouter({ redirect = PATH.homePage }) {
  const { user } = useContext(AuthContext)

  return Boolean(user) === false ? <Outlet /> : <Navigate to={redirect} />
}
