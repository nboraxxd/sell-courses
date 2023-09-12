import { AuthInput } from '@/components/AuthInput'
import { Button } from '@/components/Button'
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/constants/passwordLength'
import PATH from '@/constants/path'
import { SERVICE_STATUS } from '@/constants/serviceStatus'
import useAsync from '@/hook/useAsync'
import useForm from '@/hook/useForm'
import userService from '@/services/user.service'
import { handleError } from '@/utils/handleError'
import { confirm, max, min, regexp, required } from '@/utils/validate'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { twJoin } from 'tailwind-merge'

export default function Register() {
  const { register, isValid, values } = useForm({
    email: [required('Vui lòng nhập email của bạn'), regexp('email', 'Email chưa đúng định dạng')],
    name: [required('Vui lòng tên của bạn')],
    password: [
      required('Vui lòng nhập mật khẩu của bạn'),
      min(PASSWORD_MIN_LENGTH, `Mật khẩu phải có tối thiểu ${PASSWORD_MIN_LENGTH} ký tự`),
      max(PASSWORD_MAX_LENGTH, `Mật khẩu chỉ được phép có tối đa ${PASSWORD_MAX_LENGTH} ký tự`),
    ],
    confirmPassword: [
      required('Vui lòng nhập lại mật khẩu của bạn'),
      confirm('password', 'Các mật khẩu đã nhập chưa khớp với nhau'),
    ],
  })

  const registerService = useAsync(userService.register)
  const resendEmailService = useAsync(userService.resendEmail)

  async function handleOnSubmit(ev) {
    ev.preventDefault()

    if (isValid() === true) {
      try {
        const response = await registerService.excute({
          username: values.email,
          name: values.name.trim(),
          password: values.password,
        })

        if (response.success === true) {
          toast.success(response.message)
        }
      } catch (error) {
        handleError(error)
      }
    }
  }

  async function handleResendEmail() {
    try {
      const respoonse = await resendEmailService.excute({ username: values.email })
      if (respoonse.message) {
        toast.success(respoonse.message)
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <main id="main">
      <Helmet>
        <title>Đăng ký - Sell Courses</title>
        <meta name="description" content="Đăng ký tài khoản dự án Sell Courses của Spacedev" />
      </Helmet>
      <div className="auth">
        {registerService.status === SERVICE_STATUS.successful ? (
          <div className="register-success mx-auto my-40 max-w-[43rem] bg-white">
            <div className="contain p-12 text-center">
              <h1 className="main-title mb-5 capitalize">Tạo tài khoản thành công</h1>
              <p className="mb-5">
                <strong className="text-lg">Bạn vui lòng kiểm tra email để kích hoạt tài khoản.</strong>
              </p>
              <button
                className={twJoin(
                  'link',
                  resendEmailService.status === SERVICE_STATUS.pending && 'cursor-not-allowed opacity-60',
                )}
                onClick={handleResendEmail}
              >
                {resendEmailService.status === SERVICE_STATUS.pending && (
                  <span className=" mr-2 inline-block h-[15px] w-[15px] animate-spin rounded-[50%] border-[3px] border-solid border-b-transparent"></span>
                )}
                Gửi lại email kích hoạt
              </button>
            </div>
            <Link to={PATH.signin} className="btn main rect w-full">
              Đăng nhập
            </Link>
          </div>
        ) : (
          <form className="wrap" onSubmit={handleOnSubmit}>
            <h1 className="title">Đăng ký</h1>
            <AuthInput type="email" placeholder="Email của bạn" autoComplete="email" {...register('email')} />
            <AuthInput placeholder="Tên của bạn" autoComplete="off" {...register('name')} />
            <AuthInput type="password" placeholder="Mật khẩu" autoComplete="new-password" {...register('password')} />
            <AuthInput
              type="password"
              placeholder="Nhập lại mật khẩu"
              autoComplete="new-password"
              {...register('confirmPassword')}
            />
            <p className="policy">
              Bằng việc đăng kí, bạn đã đồng ý <Link to={PATH.about}>Điều khoản bảo mật</Link> của Spacedev
            </p>
            <Button
              className="btn-login"
              isLoading={registerService.status === SERVICE_STATUS.pending}
              disabled={registerService.status === SERVICE_STATUS.pending}
            >
              Đăng ký
            </Button>
          </form>
        )}
      </div>
    </main>
  )
}
