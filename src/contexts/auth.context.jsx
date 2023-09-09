/* eslint-disable no-console */
import PATH from '@/constants/path'
import authService from '@/services/auth.service'
import userService from '@/services/user.service'
import {
  clearProfileUserFromLS,
  clearTokenFromLS,
  getProfileUserFromLS,
  setProfileUserToLS,
  setTokenToLS,
} from '@/utils/token'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(getProfileUserFromLS)
  const navigate = useNavigate()

  async function login(body) {
    try {
      const response = await authService.login(body)
      if (response.data) {
        setTokenToLS(response.data)

        try {
          const response = await userService.getProfile()
          setProfileUserToLS(response.data)
          setUser(response.data)
          toast.success('Đăng nhập tài khoản thành công')
          navigate(PATH.homePage)

          return response.data
        } catch (error) {
          if (error?.response?.status === 404) {
            toast.error(error?.message)
          }
          console.log(error)
          throw error
        }
      }
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message)
      }
      console.log(error)
      throw error
    }
  }

  function logout() {
    setUser(null)
    clearTokenFromLS()
    clearProfileUserFromLS()
    toast.success('Đăng xuất tài khoản thành công')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
