import { COURSE_API, api } from '@/utils/api'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 6

const coursesService = {
  getCourses(page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) {
    return api.get(`${COURSE_API}/courses?page=${page}&limit=${limit}`)
  },

  getCourseDetail(id) {
    return api.get(`${COURSE_API}/courses/${id}`)
  },

  getCoursesRelated(id) {
    return api.get(`${COURSE_API}/courses/related/${id}`)
  },
}

export default coursesService
