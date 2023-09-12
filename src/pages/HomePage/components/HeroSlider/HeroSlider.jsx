/* eslint-disable no-undef */
import PATH from '@/constants/path'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export const HeroSlider = () => {
  const ref = useRef()

  useEffect(() => {
    const $this = $(ref.current)

    $this.flickity({
      contain: true,
      wrapAround: false,
      autoPlay: true,
      cellAlign: 'left',
      prevNextButtons: false,
    })
  }, [])

  return (
    <div className="slider" ref={ref}>
      <div className="item">
        <div className="container">
          <div className="content">
            <h2 className="title">
              Điều quan trọng không phải là <span style={{ color: 'rgb(229, 57, 53)' }}>vị trí đứng</span> mà là{' '}
              <span style={{ color: 'rgb(63, 81, 181)' }}>hướng đi</span>
            </h2>
            <Link to={PATH.courses} className="btn main round">
              KHÓA HỌC
            </Link>
          </div>
        </div>
        <div className="jarallax-img">
          <img src="./img/banner1.jpg" alt="" />
        </div>
      </div>
      <div className="item">
        <div className="container">
          <div className="content">
            <h2 className="title text-[#3F51B5]">Kiến thức</h2>
            <h2 className="title">mở ra trang mới cuộc đời bạn</h2>
            <Link to={PATH.about} className="btn main round">
              Về chúng tôi
            </Link>
          </div>
        </div>
        <div className="jarallax-img">
          <img src="./img/banner2.jpg" alt="" />
        </div>
      </div>
      <div className="item">
        <div className="container">
          <div className="content">
            <h2 className="title text-[#3F51B5]">Chuyên nghiệp</h2>
            <h2 className="title">làm cho bạn khác biệt</h2>
            <Link to={PATH.contact} className="btn main round">
              Liên hệ
            </Link>
          </div>
        </div>
        <div className="jarallax-img">
          <img src="./img/banner3.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}
