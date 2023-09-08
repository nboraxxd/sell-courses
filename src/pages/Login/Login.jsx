import { useContext } from 'react'
import { Link } from 'react-router-dom'
import PATH from '@/constants/path'
import { AuthContext } from '@/contexts/auth.context'
import { AuthInput } from '@/components/AuthInput'
import useForm from '@/hook/useForm'
import { max, min, regexp, required } from '@/utils/validate'

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 32

export default function Login() {
  const { login } = useContext(AuthContext)

  const { register, errors, isValid } = useForm({
    email: [required('Vui lòng nhập email của bạn'), regexp('email', 'Email chưa đúng định dạng')],
    password: [
      required('Vui lòng nhập mật khẩu của bạn'),
      min(PASSWORD_MIN_LENGTH, `Mật khẩu phải có tối thiểu ${PASSWORD_MIN_LENGTH} ký tự`),
      max(PASSWORD_MAX_LENGTH, `Mật khẩu chỉ được phép có tối đa ${PASSWORD_MAX_LENGTH} ký tự`),
    ],
  })

  function handleOnSubmit(ev) {
    ev.preventDefault()

    if (isValid() === true) {
      login()
    } else {
      console.log(errors)
    }
  }

  return (
    <main id="main">
      <div className="auth">
        <div className="wrap">
          {/* login-form */}
          <form className="ct_login" noValidate onSubmit={handleOnSubmit}>
            <h1 className="title">Đăng nhập</h1>
            <AuthInput type="email" placeholder="Địa chỉ Email" autoComplete="email" {...register('email')} />
            <AuthInput
              type="password"
              placeholder="Mật khẩu"
              autoComplete="current-password"
              {...register('password')}
            />
            <div className="remember">
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
