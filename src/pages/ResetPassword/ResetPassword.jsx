import { AuthInput } from '@/components/AuthInput'
import { Button } from '@/components/Button'
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/constants/passwordLength'
import { SERVICE_STATUS } from '@/constants/serviceStatus'
import useAsync from '@/hook/useAsync'
import useForm from '@/hook/useForm'
import useQueryParams from '@/hook/useQueryParams'
import userService from '@/services/user.service'
import { handleError } from '@/utils/handleError'
import { getEmailToResetPasswordFromLS, setEmailToResetPasswordToLS, setTokenToLS } from '@/utils/token'
import { confirm, max, min, regexp, required } from '@/utils/validate'
import { toast } from 'sonner'

export default function ResetPassword() {
  const { code } = useQueryParams()

  const resetPasswordForm = useForm({
    email: [required('Vui lòng nhập email của bạn'), regexp('email', 'Email chưa đúng định dạng')],
  })

  const changePasswordByCodeForm = useForm({
    password: [
      required('Vui lòng đặt lại mật khẩu'),
      min(PASSWORD_MIN_LENGTH, `Mật khẩu phải có tối thiểu ${PASSWORD_MIN_LENGTH} ký tự`),
      max(PASSWORD_MAX_LENGTH, `Mật khẩu chỉ được phép có tối đa ${PASSWORD_MAX_LENGTH} ký tự`),
    ],
    confirmPassword: [
      required('Vui lòng xác nhận lại mật khẩu'),
      confirm('password', 'Các mật khẩu đã nhập chưa khớp với nhau'),
    ],
  })

  const resetPasswordService = useAsync(userService.resetPassword)
  const changePasswordByCodeService = useAsync(userService.changePasswordByCode)

  async function handleOnSendEmail(ev) {
    ev.preventDefault()

    if (resetPasswordForm.isValid() === true) {
      try {
        const response = await resetPasswordService.excute({ username: resetPasswordForm.values.email })
        if (response?.message) {
          setEmailToResetPasswordToLS(resetPasswordForm.values.email || null)
          toast.success(response.message)
        }
      } catch (error) {
        handleError(error)
      }
    }
  }

  async function handleOnResetPassword(ev) {
    ev.preventDefault()

    if (changePasswordByCodeForm.isValid() === true && code !== undefined) {
      try {
        const response = await changePasswordByCodeService.excute({
          password: changePasswordByCodeForm.values.password,
          code,
        })

        if (response.data) {
          setTokenToLS(response.data)
          toast.success('Đặt lại mật khẩu thành công')
        }
      } catch (error) {
        handleError(error)
      }
    }
  }

  return (
    <main id="main">
      <div className="auth">
        {resetPasswordService.status !== SERVICE_STATUS.successful && code === undefined && (
          <form className="wrap" onSubmit={handleOnSendEmail} noValidate>
            <h1 className="title">Đặt lại mật khẩu</h1>
            <AuthInput
              type="email"
              autoComplete="email"
              placeholder="Email của bạn"
              {...resetPasswordForm.register('email')}
            />
            <Button
              isLoading={resetPasswordService.status === SERVICE_STATUS.pending}
              disabled={resetPasswordService.status === SERVICE_STATUS.pending}
              className="mt-2"
            >
              Nhận email đặt lại mật khẩu
            </Button>
          </form>
        )}

        {resetPasswordService.status === SERVICE_STATUS.successful && code === undefined && (
          <div className="wrap !my-[47px] !max-w-[620px]">
            <h1 className="title">Gửi email lấy lại mật khẩu thành công</h1>
            <p className="text-center">
              Chúng tôi đã gửi cho bạn email lấy lại mật khẩu, xin vui lòng kiểm tra email và làm theo hướng dẫn
            </p>
          </div>
        )}

        {code !== undefined && (
          <form className="wrap" onSubmit={handleOnResetPassword} noValidate>
            <h1 className="title">Đặt lại mật khẩu</h1>
            <AuthInput
              type="email"
              autoComplete="email"
              placeholder="Email của bạn"
              disabled
              defaultValue={getEmailToResetPasswordFromLS()}
            />
            <AuthInput
              type="password"
              placeholder="Mật khẩu mới"
              autoComplete="new-password"
              {...changePasswordByCodeForm.register('password')}
            />
            <AuthInput
              type="password"
              placeholder="Xác nhận mật khẩu"
              autoComplete="new-password"
              {...changePasswordByCodeForm.register('confirmPassword')}
            />
            <Button
              isLoading={changePasswordByCodeService.status === SERVICE_STATUS.pending}
              disabled={changePasswordByCodeService.status === SERVICE_STATUS.pending}
              className="mt-2"
            >
              Đặt lại mật khẩu
            </Button>
          </form>
        )}
      </div>
    </main>
  )
}
