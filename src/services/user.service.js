import { USER_API, api } from '@/utils/api'

const userService = {
  register(body) {
    return api.post(`${USER_API}/register`, body)
  },

  getProfileUserFromLS() {
    return api.get(USER_API)
  },
}

export default userService
