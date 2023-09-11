import { AUTH_API, api } from '@/utils/api'

const authService = {
  login(body) {
    return api.post(`${AUTH_API}/login`, body)
  },

  refreshToken(body) {
    return api.post(`${AUTH_API}/refresh-token`, body)
  },
}

export default authService
