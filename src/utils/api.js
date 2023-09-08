import axios from 'axios'

export const COURSE_API = import.meta.env.VITE_COURSES_API
export const ORGANIZATION_API = import.meta.env.VITE_ORGANIZATION_API
export const USER_API = import.meta.env.VITE_USER_API

export const api = axios.create()
api.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request dược gửi đi
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
  function (error) {
    throw error
  },
)
