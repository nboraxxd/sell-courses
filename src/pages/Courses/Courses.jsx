import { Fragment, useEffect, useState } from 'react'
import useScrollTop from '@/hook/useScrollTop'
import { CourseCardLoading } from '@/components/CourseCard'
import { CourseList } from '@/components/CourseList'
import useQueryParams from '@/hook/useQueryParams'
import coursesService from '@/services/courses.service'
import { Pagination } from '@/pages/Courses'

export default function Courses() {
  useScrollTop()

  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const queryParams = useQueryParams()

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        setIsLoading(true)
        const response = await coursesService.getCourses(queryParams.page, queryParams.limit)

        setCourses(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [queryParams.limit, queryParams.page])

  return (
    <main id="main">
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
          <div className="list row">
            {isLoading === true ? (
              Array.from(Array(6)).map((_, i) => (
                <Fragment key={i}>
                  <CourseCardLoading />
                </Fragment>
              ))
            ) : (
              <CourseList courses={courses.data} />
            )}
          </div>
          <div className="mt-10 flex justify-end">
            <Pagination totalPage={courses.paginate?.totalPage} queryParams={queryParams} />
          </div>
        </div>
      </section>
    </main>
  )
}
