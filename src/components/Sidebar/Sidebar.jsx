import PATH from '@/constants/path'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ handleCloseSidebar }) {
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <NavLink to={PATH.homePage}>Trang chủ</NavLink>
          </li>
          <li>
            <NavLink to={PATH.team}>Spacedev Team</NavLink>
          </li>
          <li>
            <NavLink to={PATH.courses}>Khóa Học</NavLink>
          </li>
          <li>
            <NavLink to={PATH.projects}>Dự Án</NavLink>
          </li>
          <li>
            <NavLink to={PATH.contact}>Liên hệ</NavLink>
          </li>
        </ul>
      </nav>
      <div className="overlay_nav" onClick={handleCloseSidebar} />
    </>
  )
}
