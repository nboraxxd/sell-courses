import { ORGANIZATION_API, api } from '@/utils/api'

const organizationService = {
  contact(body) {
    return api.post(`${ORGANIZATION_API}/contact`, body)
  },
}

export default organizationService
