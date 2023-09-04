const USER_PATH = '/user'
const COURSES_PATH = '/courses'

const PATH = {
  homePage: '/',
  register: '/register',
  login: '/login',
  resetPassword: '/reset-password',
  courses: '/courses',
  courseDetail: COURSES_PATH + '/:id',
  courseRegister: '/register/:id',
  team: '/team',
  projects: '/projects',
  contact: '/contact',
  faq: '/faq',
  payment: '/payment',
  coin: '/coin',
  page404: '*',
  user: {
    index: USER_PATH,
    courses: USER_PATH + '/courses',
    projects: USER_PATH + '/projects',
    changePassword: USER_PATH + '/change-password',
  },
}

export default PATH
