import useFetch from '@/hook/useFetch'
import coursesService from '@/services/courses.service'
import CourseItemLoading from './CourseItemLoading'
import { SERVICE_STATUS } from '@/constants/serviceStatus'
import { Link, generatePath } from 'react-router-dom'
import PATH from '@/constants/path'
import dayjs from 'dayjs'
import { Helmet } from 'react-helmet-async'

export default function Courses() {
  const { data, status } = useFetch(coursesService.getMyCourse)
  const myCoursesData = data?.data

  if (status === SERVICE_STATUS.pending || status === SERVICE_STATUS.idle) {
    return (
      <div className="tab2">
        {Array.from(Array(2)).map((_, index) => (
          <CourseItemLoading key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="tab2">
      <Helmet>
        <title>Khóa của của bạn - Sell Courses</title>
        <meta name="description" content="Khóa học bạn đang mua trong dự án Sell Courses của Spacedev" />
      </Helmet>
      {status === SERVICE_STATUS.successful && myCoursesData.length === 0 ? (
        <div className="item !mb-0 h-80 flex-col items-center gap-10 px-2 py-12 md:h-64">
          <p className="text-xl font-bold uppercase">Bạn chưa đăng ký khoá học</p>
          <Link to={PATH.courses} className="btn main rect">
            về trang danh sách khoá học
          </Link>
        </div>
      ) : (
        myCoursesData.map((item) => {
          const courseDetailPath = generatePath(PATH.courseDetail, { id: `${item.course.slug}-id${item.course.id}` })
          return (
            <div key={item.course_id} className="item">
              <Link to={courseDetailPath} className="cover group h-80 overflow-hidden md:h-64">
                <img
                  className="transition-all duration-[400ms] group-hover:scale-105"
                  src={item.course.thumbnailUrl}
                  onError={(e) => {
                    if (e.target.src !== '/img/course-detail-img.png') {
                      e.target.onerror = null
                      e.target.src = '/img/course-detail-img.png'
                    }
                  }}
                  alt={item.course.title}
                />
              </Link>
              <div className="info">
                <Link to={courseDetailPath} className="name">
                  {item.course.title}
                </Link>
                <div className="date">Khai giảng ngày {dayjs(item.course.opening_time).format('DD/MM/YYYY')}</div>
                <div className="row">
                  <div>
                    <img src="/img/clock.svg" alt="" className="icon" />
                    {item.total_hours} giờ
                  </div>
                  <div>
                    <img src="/img/play.svg" alt="" className="icon" />
                    {item.video} video
                  </div>
                  <div>
                    <img src="/img/user.svg" alt="" className="icon" />
                    {item.student} học viên
                  </div>
                </div>
                <div className="process">
                  <div className="line">
                    <div className="rate" style={{ width: `${item.process}%` }} />
                  </div>
                  {item.process}%
                </div>
                <Link to={courseDetailPath} className="btn overlay round btn-continue">
                  Tiếp tục học
                </Link>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
