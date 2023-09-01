import { useState } from 'react'
import useForm from '@/hook/useForm'
import { regexp, required } from '@/utils/validate'
import { Checkbox } from '@/components/Checkbox'
import { TextField } from '@/components/TextField'

export default function CourseRegister() {
  const [isSuccess, setIsSuccess] = useState(false)

  const { register, values, errors, isValid } = useForm({
    name: [required('Vui lòng nhập họ và tên của bạn')],
    email: [required('Vui lòng nhập email của bạn'), regexp('email', 'Email chưa đúng định dạng')],
    phone: [required('Vui lòng nhập số điện thoại của bạn'), regexp('phone', 'Số điện thoại chưa đúng định dạng')],
    facebook: [
      regexp(
        /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/,
        'Địa chỉ Facebook chưa đúng định dạng',
      ),
    ],
  })

  function handleOnSubmit(ev) {
    ev.preventDefault()

    if (isValid() === true) {
      const trimmedForm = { ...values }
      for (const key in trimmedForm) {
        if (typeof trimmedForm[key] === 'string') {
          trimmedForm[key] = trimmedForm[key].trim()
        }
      }
      setIsSuccess(true)
    } else {
      console.log('Validate error', errors)
    }
  }

  return (
    <main id="main">
      <section className="register-course">
        {isSuccess ? (
          <div className="register-success" style={{ margin: '40px auto' }}>
            <div className="contain">
              <div className="main-title">đăng ký thành công</div>
              <p>
                <strong>Chào mừng {values.name} đã trở thành thành viên mới của khoá học [abc].</strong>
                <br />
                Cảm ơn bạn đã đăng ký khoá học tại <strong>Spacedev</strong>, chúng tôi sẽ chủ động liên lạc với bạn
                thông qua facebook hoặc số điện thoại của bạn.
              </p>
            </div>
            {/* <Link to={PATH.profile.course} className="btn main rect">
            về trang khoá học của tôi
          </Link> */}
          </div>
        ) : (
          <div className="container">
            <div className="wrap container">
              <div className="main-sub-title">ĐĂNG KÝ</div>
              <h1 className="main-title">Thực chiến Reactjs Advanced</h1>
              <div className="main-info">
                <div className="date">
                  <strong>Khai giảng:</strong> 15/11/2020
                </div>
                <div className="time">
                  <strong>Thời lượng:</strong> 18 buổi
                </div>
                <div className="time">
                  <strong>Học phí:</strong> 6,000,000 VND
                </div>
              </div>
              <form className="form" noValidate onSubmit={handleOnSubmit}>
                {/* Name Input */}
                <TextField label="Họ và tên" required placeholder="Họ và tên của bạn" {...register('name')} />

                {/* Email Input */}
                <TextField label="Email" type="email" required placeholder="Email của bạn" {...register('email')} />

                {/* Phone Input */}
                <TextField label="Số điện thoại" required placeholder="Số điện thoại của bạn" {...register('phone')} />

                {/* Facebook URL */}
                <TextField label="Địa chỉ Facebook" placeholder="https://www.facebook.com/" {...register('facebook')} />

                {/* COIN */}
                <TextField
                  labelStyle={{ alignItems: 'flex-start' }}
                  label="Sử dụng COIN"
                  render={(props) => (
                    <Checkbox {...props}>
                      Hiện có <strong>300 COIN</strong>
                    </Checkbox>
                  )}
                />

                {/* Payment */}
                <TextField
                  label="Hình thức thanh toán"
                  required
                  render={(props) => (
                    <div className="select" {...props}>
                      <div className="head">Chuyển khoản</div>
                      <div className="sub">
                        <a href="#">Chuyển khoản</a>
                        <a href="#">Thanh toán tiền mặt</a>
                      </div>
                    </div>
                  )}
                />

                {/* Opinion */}
                <TextField
                  label="Ý kiến cá nhân"
                  placeholder="Mong muốn cá nhân và lịch bạn có thể học"
                  {...register('opinion')}
                />
                <button className="btn main rect">đăng ký</button>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
