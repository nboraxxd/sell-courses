import { Checkbox } from '@/components/Checkbox'
import { TextField } from '@/components/TextField'
import { useState } from 'react'

export default function CourseRegister() {
  const [form, setForm] = useState({})
  const [error, setError] = useState({})

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
            <form className="form" noValidate>
              {/* Name Input */}
              <TextField
                label="Họ và tên"
                required
                placeholder="Họ và tên của bạn"
                value={form.name || ''}
                onChange={(ev) => setForm((form) => ({ ...form, name: ev.target.value }))}
                error={error.name}
              />

              {/* Phone Input */}
              <TextField
                label="Số điện thoại"
                required
                placeholder="Số điện thoại của bạn"
                value={form.phone || ''}
                onChange={(ev) => setForm((form) => ({ ...form, phone: ev.target.value }))}
                error={error.phone}
              />

              {/* Email Input */}
              <TextField
                label="Email"
                type="email"
                required
                placeholder="Email của bạn"
                value={form.email || ''}
                onChange={(ev) => setForm((form) => ({ ...form, email: ev.target.value }))}
                error={error.email}
              />

              {/* Facebook URL */}
              <TextField
                label="Facebook URL"
                placeholder="https://facebook.com/"
                value={form.facebook || ''}
                onChange={(ev) => setForm((form) => ({ ...form, facebook: ev.target.value }))}
                error={error.facebook}
              />

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
                value={form.opinion || ''}
                onChange={(ev) => setForm((form) => ({ ...form, opinion: ev.target.value }))}
                error={error.coin}
              />
              <button className="btn main rect">đăng ký</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
