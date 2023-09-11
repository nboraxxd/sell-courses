/* eslint-disable no-console */
import PATH from '@/constants/path'
import authService from '@/services/auth.service'
import userService from '@/services/user.service'
import { handleError } from '@/utils/handleError'
import {
  clearProfileUserFromLS,
  clearTokenFromLS,
  getProfileUserFromLS,
  setProfileUserToLS,
  setTokenToLS,
} from '@/utils/token'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(getProfileUserFromLS)
  const navigate = useNavigate()

  useEffect(() => {
    setProfileUserToLS(user || null)
  }, [user])

  async function login(body) {
    try {
      const response = await authService.login(body)
      if (response.data) {
        setTokenToLS(response.data)

        try {
          await getProfileUser()

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
      handleError(error)
      throw error
    }
  }

  async function getProfileUser() {
    const response = await userService.getProfile()
    setUser(response.data)
    toast.success('Đăng nhập tài khoản thành công')
    navigate(PATH.homePage)
  }

  function logout() {
    setUser(null)
    clearTokenFromLS()
    clearProfileUserFromLS()
    toast.success('Đăng xuất tài khoản thành công')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, getProfileUser, login, logout }}>{children}</AuthContext.Provider>
  )
}
