import PATH from '@/constants/path'
import { formatCurrency } from '@/utils/utils'
import { Link, generatePath } from 'react-router-dom'
;('tensp-id:id')

export default function CourseCard({ course }) {
  const courseDetailPath = generatePath(PATH.courseDetail, {
    id: `${course.slug}-id${course.id}`,
  })

  const courseRegisterPath = generatePath(PATH.courseRegister, {
    id: `${course.slug}-id${course.id}`,
  })

  return (
    <div className="col-md-4 course">
      <div className="wrap">
        <Link className="cover" to={courseDetailPath}>
          <img src={course.thumbnailUrl} alt={course.title} />
        </Link>
        <div className="info">
          <Link className="name" to={courseDetailPath}>
            {course.title}
          </Link>
          <p className="des">{course.short_description}</p>
        </div>
        <div className="bottom">
          <div className="teacher">
            <div className="avatar">
              <img src="/img/avt.png" alt="a" />
            </div>
            <div className="name">Vương Đặng</div>
          </div>
          <Link to={courseRegisterPath} className="register-btn">
            <span>{formatCurrency(course.money)}</span>
            <span>₫</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
