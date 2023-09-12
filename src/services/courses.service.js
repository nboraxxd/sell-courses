import { COURSE_API, api } from '@/utils/api'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 6

const coursesService = {
  getCourses(page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) {
    return api.get(`${COURSE_API}?page=${page}&limit=${limit}`)
  },

  getCourseDetail(id) {
    return api.get(`${COURSE_API}/${id}`)
  },

  getCoursesRelated(id) {
    return api.get(`${COURSE_API}/related/${id}`)
  },

  courseRegister(id, body) {
    return api.post(`${COURSE_API}/register/${id}`, body)
  },

  getMyCourse() {
    return api.get(`${COURSE_API}/my-course`)
  },
}

export default coursesService
