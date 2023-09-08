import { ORGANIZATION, api } from '@/utils/api'

const organizationService = {
  contact(body) {
    return api.post(`${ORGANIZATION}/contact`, body)
  },
}

export default organizationService
