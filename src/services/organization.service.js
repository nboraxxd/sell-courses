import { ORGANIZATION } from '@/utils/api'
import axios from 'axios'

const organizationService = {
  contact(body) {
    return axios.post(`${ORGANIZATION}/contact`, body)
  },
}

export default organizationService
