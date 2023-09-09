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
import { useState } from 'react'

export default function CourseDetail() {
  const params = useParams()
  const id = getIdFromParams(params.id)
  useScrollTop([id])

  const [activeAccordion, setActiveAccordion] = useState(-1)

  const courseDetailService = useFetch(() => coursesService.getCourseDetail(id), [id])
  const courseDetail = courseDetailService.data?.data

  const coursesRelatedService = useFetch(() => coursesService.getCoursesRelated(id), [id])
  const coursesRelated = coursesRelatedService.data?.data

  const courseRegisterPath = generatePath(PATH.courseRegister, {
    id: `${courseDetail?.slug}-id${courseDetail?.id}`,
  })

  if (courseDetailService.status === 'pending' || courseDetailService.status === 'idle') {
    return <CourseDetailLoading />
  }

  return courseDetailService.status === 'successful' && courseDetail === null ? (
    <Page404 desc="Không tìm thấy khoá học" to={PATH.courses} linkText="Danh sách khóa học" />
  ) : (
    <main id="main">
      <div className="course-detail">
        <section className="banner style2" style={{ '--background': '#cde6fb' }}>
          <div className="container">
            <div className="info">
              <h1>{courseDetail.title}</h1>
              <div className="row">
                <div className="date">
                  <strong>Khai giảng:</strong> 12/10/2020
                </div>
                <div className="time">
                  <strong>Thời lượng:</strong> 18 buổi
                </div>
              </div>
              <Link className="btn white round" style={{ '--color-btn': '#292929' }} to={courseRegisterPath}>
                đăng ký
              </Link>
            </div>
          </div>
          <div className="bottom">
            <div className="container">
              <div className="video">
                <div className="icon">
                  <img src="/img/play-icon-white.png" alt="" />
                </div>{' '}
                <span>giới thiệu</span>
              </div>
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
              <img src="/img/course-detail-img.png" alt={courseDetail?.title} />
            </div>
            <h3 className="title">nội dung khóa học</h3>
            {courseDetail.content.map((item, index) => {
              const date = index + 1

              return (
                <Accordion
                  key={index}
                  date={date}
                  active={activeAccordion === index}
                  title={item.title}
                  onClick={() => setActiveAccordion(index)}
                >
                  {item.content}
                </Accordion>
              )
            })}
            <h3 className="title">yêu cầu cần có</h3>
            <div className="row row-check">
              <div className="col-md-6">Đã từng học qua HTML, CSS</div>
              <div className="col-md-6">Cài đặt phần mềm Photoshop, Adobe illustrator, Skype</div>
            </div>
            <h3 className="title">hình thức học</h3>
            <div className="row row-check">
              <div className="col-md-6">Học offline tại văn phòng, cùng Vương Đặng và 3 đồng nghiệp.</div>
              <div className="col-md-6">Dạy và thực hành thêm bài tập online thông qua Skype.</div>
              <div className="col-md-6">
                Được các mentor và các bạn trong team Spacedev hổ trợ thông qua group Spacedev Facebook hoặc phần mềm
                điều khiển máy tính.
              </div>
              <div className="col-md-6">Thực hành 2 dự án thực tế với sự hướng dẫn của Spacedev Team.</div>
            </div>
            <h3 className="title">
              <div className="date-start">lịch học</div>
              <div className="sub">*Lịch học và thời gian có thể thống nhất lại theo số đông học viên.</div>
            </h3>
            <p>
              <strong>Ngày bắt đầu: </strong> 09/09/2020 <br />
              <strong>Thời gian học: </strong> Thứ 3 từ 18h45-21h45, Thứ 7 từ 12h-15h, Chủ nhật từ 15h-18h
            </p>
            <h3 className="title">Người dạy</h3>
            <div className="teaches">
              <div className="teacher">
                <div className="avatar">
                  <img src="/img/avt.png" alt="" />
                </div>
                <div className="info">
                  <div className="name">Đặng Thuyền Vương</div>
                  <div className="title">Founder Spacedev &amp; Fullstack developer</div>
                  <p className="intro">
                    My education, career, and even personal life have been molded by one simple principle; well designed
                    information resonates with people and can change lives.I have a passion for making information
                    resonate. It all starts with how people think. With how humans work. As humans we have learned how
                    to read and write and while that is incredible, we are also already hard-wired to do some things a
                    bit more &quot;automatically&quot;
                  </p>
                  <p>
                    <strong>Website:</strong>{' '}
                    <a href="#" target="_blank">
                      https://dangthuyenvuong.github.io/
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="user">
                <img src="/img/user-group-icon.png" alt="" /> 12 bạn đã đăng ký
              </div>
              <a className="btn main btn-register round" href="#!">
                đăng ký
              </a>
              <div className="btn-share btn overlay round btn-icon">
                <img src="/img/facebook.svg" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section className="section-4">
          <div className="container">
            <div className="textbox">
              <h3 className="sub-title">Khóa học</h3>
              <h2 className="main-title">Liên quan</h2>
            </div>
            <CourseList courses={coursesRelated} />
          </div>
        </section>
      </div>
    </main>
  )
}
