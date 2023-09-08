import { AuthInput } from '@/components/AuthInput'
import { Button } from '@/components/Button'
import useAsync from '@/hook/useAsync'
import useForm from '@/hook/useForm'
import userService from '@/services/user.service'
import { confirm, max, min, regexp, required } from '@/utils/validate'
import { toast } from 'sonner'

const PASSWORD_MIN_LENGTH = 6
const PASSWORD_MAX_LENGTH = 32

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

  const { status, excute } = useAsync(userService.register)

  async function handleOnSubmit(ev) {
    ev.preventDefault()

    try {
      if (isValid() === true) {
        const response = await excute({ username: values.email, name: values.name, password: values.password })
        console.log(response)
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message)
      }
    }
  }

  return (
    <main id="main">
      <div className="auth">
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
            Bằng việc đăng kí, bạn đã đồng ý <a href="#!">Điều khoản bảo mật</a> của Spacedev
          </p>
          <Button className="btn-login" isLoading={status === 'pending'} disabled={status === 'pending'}>
            Đăng ký
          </Button>
        </form>
      </div>
    </main>
  )
}
