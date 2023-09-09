import { Accordion } from '@/components/Accordion'
import { useState } from 'react'

const GENERAL_INFO = [
  {
    id: 1,
    title: 'TẦM NHÌN',
    content:
      '&quot;Tạo ra một cuộc sống tốt hơn cho nhiều người. Đó là khát vọng, và hướng đi của chúng tôi.&quot; <br />\r\n Hơn thế nữa, nó còn là lời hứa của chúng tôi với bạn.',
  },
  {
    id: 2,
    title: 'SỨ MỆNH',
    content:
      'Giúp mọi người có thể dễ dàng tiếp cận với các kiến thức mới, thực tiễn và mỗi ngày, từ đó giúp mọi người cải thiện cuộc sống của chính mình và mọi người xung quanh.',
  },
  {
    id: 3,
    title: 'HÀNH ĐỘNG',
    content:
      'Tạo ra nhiều giá trị cho cộng đồng &quot;học tập&quot; bằng trãi nghiệm học tập toàn vẹn. Lấy uy tín, chất lượng và sự đổi mới về công nghệ làm nền tảng để thực hiện sứ mệnh',
  },
]

const _FAQ = [
  {
    id: 1,
    title: 'HỌC NHƯ THẾ NÀO?',
    content:
      'Là hình thức học qua các video quay sẵn, các bài viết, bài tập,... và được hỗ trợ trực tuyến từ đội ngũ, thành viên của cộng đồng.',
  },
  {
    id: 2,
    title: 'CHÍNH SÁCH HOÀN TRẢ HỌC PHÍ',
    content:
      'Khi học viên đã đăng ký khóa học nhưng không có điều kiện cũng như mong muốn tiếp tục học tập, Spacedev sẽ hỗ trợ hoàn trả học phí cho học viên, mức hoàn trả tùy thuộc vào thời gian user đăng ký khóa học.',
  },
  {
    id: 3,
    title: 'CHÍNH SÁCH HỌC LẠI',
    content:
      'Sau khi hoàn thành chương trình của khóa học, học viên nếu có yêu cầu học lại vẫn có thể tiếp tuc học tập trên nền tảng hoặc tiếp tục học các khóa sau nếu hình thức là học offline hoặc online qua Zoom. Học viên hoàn toàn không mất thêm bất kì chi phí nào để học lại.',
  },
]

export default function FAQ() {
  const [activeInfo, setActiveInfo] = useState(-1)
  const [activeFAQ, setActiveFAQ] = useState(-1)

  return (
    <main id="main">
      <div className="faqpage">
        <div className="container">
          <section>
            <h1 className="main-title">Về chúng tôi</h1>
            <div className="row">
              <div className="accordion_wrap col-md-8 offset-md-2 col-sm-12">
                <h2 className="accordion__title-main">Thông tin chung</h2>
                {GENERAL_INFO.map((item, index) => (
                  <Accordion
                    key={item.id}
                    title={item.title}
                    active={activeInfo === index}
                    onClick={() => setActiveInfo(index)}
                  >
                    {item.content}
                  </Accordion>
                ))}
              </div>

              <div className="accordion_wrap col-md-8 offset-md-2 col-sm-12">
                <h3 className="accordion__title-main">Câu hỏi thường gặp</h3>
                {_FAQ.map((item, index) => (
                  <Accordion
                    key={item.id}
                    title={item.title}
                    active={activeFAQ === index}
                    onClick={() => setActiveFAQ(index)}
                  >
                    {item.content}
                  </Accordion>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
