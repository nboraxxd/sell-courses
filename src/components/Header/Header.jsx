import { useContext } from 'react'
import { Link } from 'react-router-dom'
import PATH from '@/constants/path'
import { AuthContext } from '@/contexts/auth.context'

export default function Header({ handleToggleSidebar }) {
  const { user, logout } = useContext(AuthContext)

  return (
    <header id="header">
      <div className="wrap">
        <div className="menu-hamburger" onClick={handleToggleSidebar}>
          <div className="button">
            <span />
            <span />
            <span />
          </div>
          <span className="text">menu</span>
        </div>
        <Link to={PATH.homePage} className="logo">
          <img src="/img/logo.svg" alt="Spacedev" />
          <h1>Spacedev</h1>
        </Link>
        <div className="right">
          {user ? (
            <div className="have-login">
              <div className="account">
                <div className="info">
                  <Link to={PATH.user.index} className="name">
                    Đặng Thuyền Vương
                  </Link>
                  <div className="avatar">
                    <img src="/img/avt.png" alt="avt" />
                  </div>
                </div>
              </div>
              <div className="hamberger" />
              <div className="sub">
                <Link to={PATH.user.index}>Thông tin tài khoản</Link>
                <Link to={PATH.user.courses}>Khóa học của tôi</Link>
                <button className='w-full' onClick={logout}>Đăng xuất</button>
              </div>
            </div>
          ) : (
            <div className="not-login bg-none">
              <Link to={PATH.login} className="btn-register">
                Đăng nhập
              </Link>
              <Link to={PATH.register} className="btn main btn-open-login">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="progress" />
    </header>
  )
}
