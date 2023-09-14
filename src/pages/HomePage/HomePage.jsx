import { useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollTop from '@/hook/useScrollTop'
import PATH from '@/constants/path'
import coursesService from '@/services/courses.service'
import { CourseList } from '@/components/CourseList'
import { CourseCardLoading } from '@/components/CourseCard'
import { Modal } from '@/components/Modal'
import { Testimonial } from './components/Testimonial'
import { TeamGallery } from './components/TeamGallery'
import { SERVICE_STATUS } from '@/constants/serviceStatus'
import { Helmet } from 'react-helmet-async'
import { HeroSlider } from './components/HeroSlider'
import useQuery from '@/hook/useQuery'

export default function HomePage() {
  useScrollTop()
  const [isOpenVideoModal, setIsOpenVideoModal] = useState(false)

  const { data, status } = useQuery({ queryFn: coursesService.getCourses, queryKey: 'courses', cacheTime: 3000 })
  const courses = data?.data

  return (
    <>
      <main id="main">
        <div className="homepage">
          <HeroSlider />

          <section className="section-1">
            <Helmet>
              <title>Trang chủ - Sell Courses</title>
              <meta name="description" content="Trang chủ dự án Sell Courses của Spacedev" />
            </Helmet>
            <div className="container">
              <h2 className="main-title">KHOÁ HỌC SPACEDEV</h2>
              <p className="top-des">
                Cho dù bạn muốn tìm kiếm công việc, khởi nghiệp, phát triển hoạt động kinh doanh hay chỉ đơn giản là
                muốn khám phá thế giới, hãy chọn lộ trình học tập mà bạn muốn và bắt đầu câu chuyện thành công của bạn.
              </p>
              <div className="textbox" style={{ marginTop: '100px' }}>
                <h3 className="sub-title">KHOÁ HỌC</h3>
                <h2 className="main-title">OFFLINE</h2>
              </div>
              {status === SERVICE_STATUS.pending || status === SERVICE_STATUS.idle ? (
                <div className="list row">
                  {Array.from(Array(6)).map((_, i) => (
                    <CourseCardLoading key={i} />
                  ))}
                </div>
              ) : (
                <CourseList courses={courses} />
              )}
              <div className="flex justify-center">
                <Link to={PATH.courses} className="btn main">
                  Tất cả khoá học
                </Link>
              </div>
            </div>
          </section>
          <section className="section-different">
            <div className="container">
              <div className="row">
                <div className="titlebox col-md-6 col-sm-12 col-xs-12">
                  <h2 className="main-title white textleft">
                    <span>Giá trị Cốt lỗi</span> <br /> tại Spacedev
                  </h2>
                  <div className="videodif" onClick={() => setIsOpenVideoModal(true)}>
                    <img
                      src="https://svtech.com.vn/wp-content/uploads/2020/07/dexus-office-space.jpg"
                      alt="Video modal thumbnail"
                    />
                    <div className="play-btn btn-video-intro">
                      <img src="img/play-icon.svg" alt="Play icon" />
                    </div>
                  </div>
                  <Modal
                    visible={isOpenVideoModal}
                    handleCloseVideoModal={() => setIsOpenVideoModal(false)}
                    maskCloseable
                  >
                    <iframe
                      width="840"
                      height="472.5"
                      src="https://www.youtube.com/embed/oTsopKtMS_0?si=azZr4wNAax67UcS2"
                      title="Free React Course - Setup Project React - Spacedev.vn"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </Modal>
                  <div className="item" style={{ marginTop: '35px' }}>
                    <h4>Sáng tạo và đơn giản</h4>
                    <p>
                      Spacedev đề cao những sáng tạo đơn giản thay đổi thế giới, gia tăng năng suất và cải thiện cuộc
                      sống.
                    </p>
                  </div>
                </div>
                <div className="contentbox col-md-6 col-sm-12 col-xs-12">
                  <div className="item">
                    <h4>Tập trung vào khách hàng</h4>
                    <p>
                      Spacedev được tạo ra với mục tiêu cao nhất giúp cho việc học trở nên dễ dàng hơn và kiến thức thật
                      sự ý nghĩa. Những học viên là đối tượng phục vụ của spacedev vì thế những yêu cầu chính đáng của
                      học viên sẽ được nền tảng tiếp thu và cải thiện.
                    </p>
                  </div>
                  <div className="item">
                    <h4>Gây dựng lòng tin</h4>
                    <p>
                      Spacedev luôn trung thực với những gì mình phát ngôn cũng như công bố trên các nền tảng mạng xã
                      hội. Trung thực và giữ chữ tín với học viên, với đối tác và với những người sáng lập luôn là tiêu
                      chí hàng đầu giúp nền tảng phát triển bền vững ở hiện tại và trong tương lai.
                    </p>
                  </div>
                  <div className="item">
                    <h4>Phát triển nhưng không dừng lại</h4>
                    <p>
                      Bằng việc áp dụng những công nghệ trên nền tảng và sự hoàn thiện về chức năng là mình chứng rõ
                      nhất cho sự chuyên nghiệp cũng như sự tận tâm của những người sáng lập nền tảng spacedev.vn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Testimonial />
          <TeamGallery />
          <section className="section-action">
            <div className="container">
              <h3>Học thử trước khi đăng ký KHOÁ học tại Spacedev?</h3>
              <Link className="btn main round bg-white" to={PATH.courses}>
                Học thử
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
