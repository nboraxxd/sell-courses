import { useContext } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AuthContext } from '@/contexts/auth.context'
import PATH from '@/constants/path'
import { avatarDefault } from '@/constants/images'
import useScrollTop from '@/hook/useScrollTop'

export default function UserLayout() {
  const { user } = useContext(AuthContext)
  const { pathname } = useLocation()
  useScrollTop([pathname])

  return (
    <main id="main" className="profile">
      <section>
        <div className="top-info">
          <div className="avatar">
            <img src={user.avatar || avatarDefault} alt={user.name} />
            <div className="camera" />
          </div>
          <div className="name">{user.name}</div>
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
              <Outlet context={{ user }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
