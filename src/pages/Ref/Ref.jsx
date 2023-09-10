import { TextField } from '@/components/TextField'
import { useEffect, useRef } from 'react'
/**
 *
 * Cách 1: Lưu trữ giá trị không bị thay đổi sau mỗi component re-render
 *
 * Cách 2: Selector HTML DOM
 *
 * Cách 3: forwardRef
 *
 * Cách 4: forwardRef và useImperativeHandle -> Trả ra 1 thể hiện khác của Ref
 *
 */

export default function Ref() {
  const inputRef = useRef()

  useEffect(() => {
    console.log(inputRef.current)
  }, [])

  return (
    <main id="main">
      <div className="register-course">
        <section className="section-1 wrap container">
          <h2 className="main-title">HỢP TÁC CÙNG Spacedev</h2>
          <p className="top-des">
            Đừng ngần ngại liên hệ với <strong>Spacedev</strong> để cùng nhau tạo ra những sản phẩm giá trị, cũng như
            việc hợp tác với các đối tác tuyển dụng và công ty trong và ngoài nước.
          </p>
          <form className="form">
            <TextField ref={inputRef} label="Họ và tên" required placeholder="Họ và tên bạn" />

            <label>
              <p>Số điện thoại</p>
              <input type="text" placeholder="Số điện thoại" />
            </label>
            <label>
              <p>
                Email<span>*</span>
              </p>
              <input type="text" placeholder="Email của bạn" />
            </label>
            <label>
              <p>Website</p>
              <input type="text" placeholder="Đường dẫn website http://" />
            </label>
            <label>
              <p>
                Tiêu đề<span>*</span>
              </p>
              <input type="text" placeholder="Tiêu đề liên hệ" />
            </label>
            <label>
              <p>
                Nội dung<span>*</span>
              </p>
              <textarea cols={30} rows={10} defaultValue="" />
            </label>
            <button className="btn main rect">đăng ký</button>
          </form>
        </section>
      </div>
    </main>
  )
}
