import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <main id="main" className="profile">
      <section>
        <div className="top-info">
          <div className="avatar">
            {/* <span class="text">H</span> */}
            <img src="/img/avt.png" alt="" />
            <div className="camera" />
          </div>
          <div className="name">Vương Đặng</div>
          <p className="des">Thành viên của spacedev từ ngày 20 tháng 10 năm 2022</p>
        </div>
        <div className="container">
          <div className="tab">
            <div className="tab-title">
              <a href="#!">Thông tin tài khoản</a>
              <a href="#!">Khóa học của bạn</a>
              <a href="#!">Dự án đã làm</a>
              <a href="#!">Đổi mật khẩu</a>
            </div>
            <div className="tab-content">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
