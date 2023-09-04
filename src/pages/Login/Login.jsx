import { useContext } from 'react'
import { Link } from 'react-router-dom'
import PATH from '@/constants/path'
import { AuthContext } from '@/contexts/auth.context'

export default function Login() {
  const { login } = useContext(AuthContext)

  return (
    <main id="main">
      <div className="auth">
        <div className="wrap">
          {/* login-form */}
          <form className="ct_login">
            <h2 className="title">Đăng nhập</h2>
            <input type="text" placeholder="Địa chỉ Email" />
            <p className="error !mb-1 mt-[0.125rem] min-h-[1.125rem] text-xs italic text-red-500"></p>
            <input type="password" placeholder="Mật khẩu" />
            <p className="error !mb-1 mt-[0.125rem] min-h-[1.125rem] text-xs italic text-red-500"></p>
            <div className="remember">
              <label className="btn-remember">
                <div>
                  <input type="checkbox" />
                </div>
                <p>Nhớ mật khẩu</p>
              </label>
              <Link to={PATH.resetPassword} className="forget">
                Quên mật khẩu?
              </Link>
            </div>
            <button className="btn rect main btn-login">đăng nhập</button>
            <div className="text-register">
              <span>Nếu bạn chưa có tài khoản?</span>{' '}
              <Link className="link" to={PATH.register}>
                Đăng ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
