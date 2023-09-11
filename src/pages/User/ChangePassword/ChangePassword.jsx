import { useOutletContext } from 'react-router-dom'
import { toast } from 'sonner'
import useAsync from '@/hook/useAsync'
import useForm from '@/hook/useForm'
import userService from '@/services/user.service'
import { handleError } from '@/utils/handleError'
import { confirm, different, max, min, required } from '@/utils/validate'
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/constants/passwordLength'
import { Button } from '@/components/Button'
import { TextField } from '@/components/TextField'

export default function ChangePassword() {
  const { user } = useOutletContext()

  const { isValid, register, resetValues, values } = useForm({
    currentPassword: [
      required('Vui lòng nhập mật khẩu hiện tại'),
      min(PASSWORD_MIN_LENGTH, `Mật khẩu phải có tối thiểu ${PASSWORD_MIN_LENGTH} ký tự`),
      max(PASSWORD_MAX_LENGTH, `Mật khẩu chỉ được phép có tối đa ${PASSWORD_MAX_LENGTH} ký tự`),
    ],
    newPassword: [
      required('Vui lòng nhập mật khẩu mới'),
      min(PASSWORD_MIN_LENGTH, `Mật khẩu phải có tối thiểu ${PASSWORD_MIN_LENGTH} ký tự`),
      max(PASSWORD_MAX_LENGTH, `Mật khẩu chỉ được phép có tối đa ${PASSWORD_MAX_LENGTH} ký tự`),
      different('currentPassword', 'Mật khẩu mới phải khác với mật khẩu hiện tại'),
    ],
    confirmNewPassword: [
      required('Vui lòng nhập lại mật khẩu mới'),
      confirm('newPassword', 'Các mật khẩu đã nhập chưa khớp với nhau'),
    ],
  })

  const { excute, status } = useAsync(userService.changePassword)

  async function handleOnSubmit(ev) {
    ev.preventDefault()

    if (isValid() === true) {
      try {
        const response = await excute({ currentPassword: values.currentPassword, newPassword: values.newPassword })
        if (response?.success === true) {
          toast.success(response.message)
          resetValues()
        }
      } catch (error) {
        handleError(error)
      }
    }
  }

  return (
    <form className="tab1" onSubmit={handleOnSubmit}>
      <TextField
        label="Email"
        placeholder="Email của bạn"
        classNameError="!w-full !text-xs"
        autoComplete="email"
        defaultValue={user.username}
        required
        disabled
      />
      <TextField
        label="Mật khẩu cũ"
        required
        type="password"
        placeholder="Mật khẩu cũ"
        classNameError="!w-full !text-xs"
        autoComplete="new-password"
        {...register('currentPassword')}
      />
      <TextField
        label="Mật khẩu mới"
        required
        type="password"
        placeholder="Mật khẩu mới"
        classNameError="!w-full !text-xs"
        autoComplete="new-password"
        {...register('newPassword')}
      />
      <TextField
        label="Xác nhận"
        required
        type="password"
        placeholder="Xác nhận mật khẩu"
        classNameError="!w-full !text-xs"
        autoComplete="new-password"
        {...register('confirmNewPassword')}
      />
      <Button disabled={status === 'pending'} isLoading={status === 'pending'} className="btn main rect">
        Đổi mật khẩu
      </Button>
    </form>
  )
}
