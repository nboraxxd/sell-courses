import { USER_API, api } from '@/utils/api'

const userService = {
  register(body) {
    return api.post(`${USER_API}/register`, body)
  },

  resendEmail(body) {
    return api.post(`${USER_API}/resend-email`, body)
  },

  getProfile() {
    return api.get(USER_API)
  },

  updateProfile(body) {
    return api.patch(USER_API, body)
  },

  changePassword(body) {
    return api.post(`${USER_API}/change-password`, body)
  },

  resetPassword(body) {
    return api.post(`${USER_API}/reset-password`, body)
  },

  changePasswordByCode(body) {
    return api.post(`${USER_API}/change-password-by-code`, body)
  },
}

export default userService
