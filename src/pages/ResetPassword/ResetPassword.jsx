import { AuthInput } from '@/components/AuthInput'
import { Button } from '@/components/Button'
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/constants/passwordLength'
import { SERVICE_STATUS } from '@/constants/serviceStatus'
import { AuthContext } from '@/contexts/auth.context'
import useAsync from '@/hook/useAsync'
import useForm from '@/hook/useForm'
import useQueryParams from '@/hook/useQueryParams'
import userService from '@/services/user.service'
import { handleError } from '@/utils/handleError'
import {
  clearEmailToResetPasswordFromLS,
  getEmailToResetPasswordFromLS,
  setEmailToResetPasswordToLS,
  setTokenToLS,
} from '@/utils/token'
import { confirm, max, min, regexp, required } from '@/utils/validate'
import { useContext } from 'react'
import { toast } from 'sonner'

export default function ResetPassword() {
  const { code } = useQueryParams()
  const { getProfileUser } = useContext(AuthContext)

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

  async function onResetPassword(ev) {
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

  async function onChangePasswordByCode(ev) {
    ev.preventDefault()

    if (changePasswordByCodeForm.isValid() === true && code !== undefined) {
      try {
        const response = await changePasswordByCodeService.excute({
          password: changePasswordByCodeForm.values.password,
          code,
        })

        if (response.data) {
          try {
            setTokenToLS(response.data)
            clearEmailToResetPasswordFromLS()
            await getProfileUser()
          } catch (error) {
            handleError(error)
          }
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
          <form className="wrap" onSubmit={onResetPassword} noValidate>
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
          <div className="register-success mx-auto my-40 max-w-[43rem] bg-white">
            <div className="contain p-12 text-center">
              <h1 className="title text-2xl font-bold uppercase text-[#db3244]">
                Gửi email lấy lại mật khẩu thành công
              </h1>
              <p className="mt-8 flex flex-col gap-1">
                <strong className="text-lg">Chúng tôi đã gửi email cho bạn</strong>
                <strong className="text-lg">Vui lòng kiểm tra email và làm theo hướng dẫn</strong>
              </p>
            </div>
          </div>
        )}

        {code !== undefined && (
          <form className="wrap" onSubmit={onChangePasswordByCode} noValidate>
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
