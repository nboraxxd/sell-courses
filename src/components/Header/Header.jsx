import PATH from '@/constants/path'
import { Link } from 'react-router-dom'

export default function Header({ handleToggleSidebar }) {
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
              <Link to={PATH.user.index}>Đăng xuất</Link>
            </div>
          </div>
          {/* <div class="not-login bg-none">
        <a href="#" class="btn-register">Đăng nhập</a>
        <a href="login.html" class="btn main btn-open-login">Đăng ký</a>
    </div> */}
        </div>
      </div>
      <div className="progress" />
    </header>
  )
}
