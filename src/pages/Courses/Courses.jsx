import useScrollTop from '@/hook/useScrollTop'
import useQueryParams from '@/hook/useQueryParams'
import useFetch from '@/hook/useFetch'
import coursesService from '@/services/courses.service'
import { CourseCardLoading } from '@/components/CourseCard'
import { CourseList } from '@/components/CourseList'
import { Pagination } from '@/pages/Courses'
import { SERVICE_STATUS } from '@/constants/serviceStatus'
import { Helmet } from 'react-helmet-async'

export default function Courses() {
  const queryParams = useQueryParams()
  useScrollTop([queryParams.limit, queryParams.page])

  const { status, data: courses } = useFetch(coursesService.getCourses, [queryParams.limit, queryParams.page])

  return (
    <main id="main">
      <Helmet>
        <title>Danh sách khóa học - Sell Courses</title>
        <meta name="description" content="Danh sách các khóa học trong Sell Courses của Spacedev" />
      </Helmet>
      <section className="section-1">
        <div className="container">
          <h2 className="main-title">KHÓA HỌC SPACEDEV</h2>
          <p className="top-des">
            Cho dù bạn muốn tìm kiếm công việc, khởi nghiệp, phát triển hoạt động kinh doanh hay chỉ đơn giản là muốn
            khám phá thế giới, hãy chọn lộ trình học tập mà bạn muốn và bắt đầu câu chuyện thành công của bạn.
          </p>
          <div className="textbox" style={{ marginTop: 100 }}>
            <h3 className="sub-title">KHÓA HỌC</h3>
            <h2 className="main-title">OFFLINE</h2>
          </div>
          {status === SERVICE_STATUS.pending || status === SERVICE_STATUS.idle ? (
            <div className="list row">
              {Array.from(Array(6)).map((_, i) => (
                <CourseCardLoading key={i} />
              ))}
            </div>
          ) : (
            <CourseList courses={courses.data} />
          )}
          <div className="mt-10 flex justify-end">
            <Pagination totalPage={courses?.paginate.totalPage} queryParams={queryParams} />
          </div>
        </div>
      </section>
    </main>
  )
}
