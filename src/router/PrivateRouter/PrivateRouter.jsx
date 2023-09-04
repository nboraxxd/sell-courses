import { useContext } from 'react'
import { AuthContext } from '@/contexts/auth.context'
import { Navigate, Outlet } from 'react-router-dom'
import PATH from '@/constants/path'

export default function PrivateRouter({ redirect = PATH.login }) {
  const { user } = useContext(AuthContext)

  return user ? <Outlet /> : <Navigate to={redirect} />
}
