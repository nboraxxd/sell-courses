import { AUTH_API, api } from '@/utils/api'

const authService = {
  login(body) {
    return api.post(`${AUTH_API}/login`, body)
  },
}

export default authService
