import { TextField } from '@/components/TextField'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({})

  function register(name) {
    return {
      value: form[name] || '',
      onChange: (ev) => setForm((form) => ({ ...form, [name]: ev.target.value })),
    }
  }

  function handleOnSubmit(ev) {
    ev.preventDefault()
  }

  return (
    <main id="main">
      <div className="register-course">
        <section className="section-1 wrap container">
          {/* <div class="main-sub-title">liên hệ</div> */}
          <h2 className="main-title">HỢP TÁC CÙNG Spacedev</h2>
          <p className="top-des">
            Đừng ngần ngại liên hệ với <strong>Spacedev</strong> để cùng nhau tạo ra những sản phẩm giá trị, cũng như
            việc hợp tác với các đối tác tuyển dụng và công ty trong và ngoài nước.
          </p>
          <form className="form" onSubmit={handleOnSubmit} noValidate>
            {/* Name Input */}
            <TextField label="Họ và tên" required placeholder="Họ và tên bạn" {...register('name')} />
            {/* Phone Input */}
            <TextField label="Số điện thoại" placeholder="Số điện thoại của bạn" {...register('phone')} />
            {/* Email Input */}
            <TextField label="Email" required type="email" placeholder="Email của bạn" {...register('email')} />
            {/* Website Input */}
            <TextField label="Website" required placeholder="Đường dẫn website http://" {...register('website')} />
            {/* Contact Title Input */}
            <TextField label="Tiêu đề" required placeholder="Tiêu đề liên hệ" {...register('title')} />
            {/* Contact Content Textarea */}
            <TextField
              label="Nội dung"
              required
              {...register('content')}
              render={(props) => <textarea {...props} cols={30} rows={10} />}
            />
            <button className="btn main rect">đăng ký</button>
          </form>
        </section>
        {/* <div class="register-success">
          <div class="contain">
              <div class="main-title">đăng ký thành công</div>
              <p>
                  <strong>Chào mừng Vương Đặng đã trở thành thành viên mới của Spacedev Team.</strong> <br>
                  Cảm ơn bạn đã đăng ký khóa học tại <strong>Spacedev</strong>, chúng tôi sẽ chủ động liên lạc với bạn thông qua facebook
                  hoặc số điện thoại của bạn.
              </p>
          </div>
          <a href="/" class="btn main rect">về trang chủ</a>
      </div> */}
      </div>
    </main>
  )
}
