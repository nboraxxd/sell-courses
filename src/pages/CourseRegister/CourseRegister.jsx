import { Checkbox } from '@/components/Checkbox'
import { TextField } from '@/components/TextField'
import { regexp, required, validate } from '@/utils/validate'
import { useState } from 'react'

export default function CourseRegister() {
  const [form, setForm] = useState({})
  const [error, setError] = useState({})

  function register(name) {
    return {
      value: form[name] || '',
      error: error[name] || '',
      onChange: (ev) => setForm((form) => ({ ...form, [name]: ev.target.value })),
    }
  }

  function handleOnSubmit(ev) {
    ev.preventDefault()

    const errorObject = validate(
      {
        name: [required('Vui lòng nhập họ và tên của bạn')],
        email: [required('Vui lòng nhập email của bạn'), regexp('email', 'Email chưa đúng định dạng')],
        phone: [required('Vui lòng nhập số điện thoại của bạn'), regexp('phone', 'Số điện thoại chưa đúng định dạng')],
        facebook: [
          regexp(
            /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/,
            'Địa chỉ Facebook chưa đúng định dạng',
          ),
        ],
      },
      form,
    )

    setError(errorObject)
    if (Object.keys(errorObject).length === 0) {
      const trimmedForm = { ...form }
      for (const key in trimmedForm) {
        if (typeof trimmedForm[key] === 'string') {
          trimmedForm[key] = trimmedForm[key].trim()
        }
      }
      console.log('Validate success', trimmedForm)
    } else {
      console.log('Validate error', errorObject)
    }
  }

  return (
    <main id="main">
      <section className="register-course">
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
                checked={form.coin || false}
                onChange={(ev) => setForm((form) => ({ ...form, coin: ev.target.checked }))}
                error={error.coin}
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
                checked={form.coin || false}
                onChange={(ev) => setForm((form) => ({ ...form, coin: ev.target.checked }))}
                error={error.coin}
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
      </section>
    </main>
  )
}
