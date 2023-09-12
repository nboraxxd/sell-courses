import { Link, generatePath, useParams } from 'react-router-dom'
import useScrollTop from '@/hook/useScrollTop'
import useFetch from '@/hook/useFetch'
import PATH from '@/constants/path'
import coursesService from '@/services/courses.service'
import { formatCurrency, getIdFromParams } from '@/utils/utils'
import { Page404 } from '@/pages/404'
import CourseDetailLoading from './CourseDetailLoading'
import { CourseList } from '@/components/CourseList'
import { Accordion } from '@/components/Accordion'
import { SERVICE_STATUS } from '@/constants/serviceStatus'
import { CourseCardLoading } from '@/components/CourseCard'
import dayjs from 'dayjs'
import { Teacher } from '@/pages/CourseDetail'
import { Modal } from '@/components/Modal'
import { useMemo, useState } from 'react'

export default function CourseDetail() {
  const params = useParams()
  const id = getIdFromParams(params.id)
  useScrollTop([id])

  const [isOpenVideoModal, setIsOpenVideoModal] = useState(false)

  const courseDetailService = useFetch(() => coursesService.getCourseDetail(id), [id])
  const courseDetail = courseDetailService.data?.data

  const coursesRelatedService = useFetch(() => coursesService.getCoursesRelated(id), [id])
  const coursesRelated = coursesRelatedService.data?.data

  const courseRegisterPath = useMemo(
    () =>
      generatePath(PATH.courseRegister, {
        id: `${courseDetail?.slug}-id${courseDetail?.id}`,
      }),
    [courseDetail?.id, courseDetail?.slug],
  )

  const openingTime = useMemo(
    () => dayjs(courseDetail?.opening_time).format('DD/MM/YYYY'),
    [courseDetail?.opening_time],
  )

  if (courseDetailService.status === SERVICE_STATUS.pending || courseDetailService.status === SERVICE_STATUS.idle) {
    return <CourseDetailLoading />
  }

  return courseDetailService.status === SERVICE_STATUS.successful && courseDetail === null ? (
    <Page404 desc="Không tìm thấy khoá học" to={PATH.courses} linkText="Về trang danh sách khóa học" />
  ) : (
    <main id="main">
      <div className="course-detail">
        <section className="banner style2" style={{ '--background': courseDetail.template_color_banner || '#cde6fb' }}>
          <div className="container">
            <div className="info">
              <h1>{courseDetail.title}</h1>
              <div className="row">
                <div className="date">
                  <strong>Khai giảng:</strong> {openingTime}
                </div>
                <div className="time">
                  <strong>Thời lượng:</strong> {courseDetail.count_video} buổi
                </div>
              </div>
              <Link
                className="btn white round"
                style={{ '--color-btn': courseDetail.template_color_btn || '#292929' }}
                to={courseRegisterPath}
              >
                đăng ký
              </Link>
            </div>
          </div>
          <div className="bottom">
            <div className="container">
              <button className="video" onClick={() => setIsOpenVideoModal(true)}>
                <div className="icon">
                  <img src="/img/play-icon-white.png" alt="" />
                </div>
                <span>giới thiệu</span>
              </button>
              <Modal visible={isOpenVideoModal} handleCloseVideoModal={() => setIsOpenVideoModal(false)} maskCloseable>
                <iframe
                  width="840"
                  height="472.5"
                  src="https://www.youtube.com/embed/oTsopKtMS_0?si=azZr4wNAax67UcS2"
                  title="Free React Course - Setup Project React - Spacedev.vn"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </Modal>
              <div className="money">
                <span>{formatCurrency(courseDetail.money)}</span>
                <span>₫</span>
              </div>
            </div>
          </div>
        </section>
        <section className="section-2">
          <div className="container">
            <p className="des">{courseDetail.long_description}</p>
            <h2 className="title">giới thiệu về khóa học</h2>
            <div className="cover">
              <img src="/img/course-detail-img.png" alt={courseDetail.title} />
            </div>
            <h3 className="title">nội dung khóa học</h3>
            <Accordion>
              {courseDetail.content.map((item, index) => {
                const date = index + 1
                return (
                  <Accordion.Content key={index} date={date} title={item.title}>
                    {item.content}
                  </Accordion.Content>
                )
              })}
            </Accordion>
            <h3 className="title">yêu cầu cần có</h3>
            <div className="row row-check">
              {courseDetail.required.map((e, i) => (
                <div className="col-md-6" key={i}>
                  {e.content}
                </div>
              ))}
            </div>
            <h3 className="title">hình thức học</h3>
            <div className="row row-check">
              {courseDetail.benefits.map((e, i) => (
                <div className="col-md-6" key={i}>
                  {e.content}
                </div>
              ))}
            </div>
            <h3 className="title">
              <div className="date-start">lịch học</div>
              <div className="sub">*Lịch học và thời gian có thể thống nhất lại theo số đông học viên.</div>
            </h3>
            <p>
              <strong>Ngày bắt đầu: </strong> {openingTime} <br />
              <strong>Thời gian học: </strong> {courseDetail.schedule}
            </p>
            <h3 className="title">Người dạy</h3>
            <Teacher {...courseDetail.teacher} />
            {courseDetail.mentor.length > 0 && (
              <>
                <h3 className="title">Người hướng dẫn</h3>
                {courseDetail.mentor.map((item) => (
                  <Teacher key={item.id} {...item} />
                ))}
              </>
            )}
            <div className="bottom">
              <div className="user">
                <img src="/img/user-group-icon.png" alt="" /> {courseDetail.number_student_default} bạn đã đăng ký
              </div>
              <Link className="btn main btn-register round" to={courseRegisterPath}>
                đăng ký
              </Link>
              <a
                className="btn-share btn overlay round btn-icon"
                href="https://www.facebook.com/spacedev.vn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img src="/img/facebook.svg" alt="Facebook" />
              </a>
            </div>
          </div>
        </section>
        <section className="section-4">
          <div className="container">
            <div className="textbox">
              <h3 className="sub-title">Khóa học</h3>
              <h2 className="main-title">Liên quan</h2>
            </div>
            {coursesRelatedService.status === SERVICE_STATUS.pending ||
            coursesRelatedService.status === SERVICE_STATUS.idle ? (
              <div className="list row">
                {Array.from(Array(3)).map((_, i) => (
                  <CourseCardLoading key={i} />
                ))}
              </div>
            ) : (
              <CourseList courses={coursesRelated} />
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
