import axios from 'axios'
import { clearProfileUserFromLS, clearTokenFromLS, getTokenFromLS, setTokenToLS } from '@/utils/token'
import authService from '@/services/auth.service'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/auth.context'

export const COURSE_API = import.meta.env.VITE_COURSES_API
export const ORGANIZATION_API = import.meta.env.VITE_ORGANIZATION_API
export const USER_API = import.meta.env.VITE_USER_API
export const AUTH_API = import.meta.env.VITE_AUTH_API

export const api = axios.create()
api.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request được gửi đi
    const token = getTokenFromLS()

    if (Boolean(token) === true) {
      config.headers['Authorization'] = `Bearer ${token.accessToken}`
    }

    return config
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error)
  },
)

// Thêm một bộ đón chặn response
api.interceptors.response.use(
  function (response) {
    return response.data
  },
  async function (error) {
    if (error.response.status === 403 && error.response.data.error_code === 'TOKEN_EXPIRED') {
      try {
        const token = getTokenFromLS()

        const response = await authService.refreshToken({ refreshToken: token.refreshToken })
        if (response?.data) {
          setTokenToLS(response.data)
          return api(error.config)
        }
      } catch (error) {
        const { setUser } = useContext(AuthContext)

        setUser(null)
        clearTokenFromLS()
        clearProfileUserFromLS()
        throw error
      }
    }

    throw error
  },
)
