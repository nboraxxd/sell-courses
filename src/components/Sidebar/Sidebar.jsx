export default function Sidebar() {
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <a href="./signin.html">Đăng ký / Đăng nhập</a>
          </li>
          <li>
            <a href="./profile.html" className="account">
              <div className="avatar">
                <img src="img/avt.png" alt="avt" />
              </div>
              <div className="name">Đặng Thuyền Vương</div>
            </a>
          </li>
          <li>
            <a className="active" href="./">
              Trang chủ
            </a>
          </li>
          <li>
            <a href="./team.html">Spacedev Team</a>
          </li>
          <li>
            <a href="./course-list.html">Khóa Học</a>
          </li>
          <li>
            <a href="./project.html">Dự Án</a>
          </li>
          <li>
            <a href="./contact.html">Liên hệ</a>
          </li>
        </ul>
      </nav>
      <div className="overlay_nav" />
    </>
  )
}
