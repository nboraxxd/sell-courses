import PATH from '@/constants/path'
import { NavLink, Outlet } from 'react-router-dom'

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
              <NavLink to={PATH.user.index} end>
                Thông tin tài khoản
              </NavLink>
              <NavLink to={PATH.user.courses}>Khóa học của bạn</NavLink>
              <NavLink to={PATH.user.projects}>Dự án đã làm</NavLink>
              <NavLink to={PATH.user.changePassword}>Đổi mật khẩu</NavLink>
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