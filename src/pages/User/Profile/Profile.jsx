import { useContext } from 'react'
import useAsync from '@/hook/useAsync'
import { AuthContext } from '@/contexts/auth.context'
import userService from '@/services/user.service'
import { Button } from '@/components/Button'
import { TextField } from '@/components/TextField'
import useForm from '@/hook/useForm'
import { regexp, required } from '@/utils/validate'
import { handleError } from '@/utils/handleError'
import { toast } from 'sonner'
import { SERVICE_STATUS } from '@/constants/serviceStatus'

export default function Profile() {
  const { user, setUser } = useContext(AuthContext)
  const { values, register, isValid } = useForm(
    {
      name: [required('Vui lòng nhập họ và tên của bạn')],
      phone: [required('Vui lòng nhập số điện thoại của bạn'), regexp('phone', 'Số điện thoại chưa đúng định dạng')],
      fb: [
        regexp(
          /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/,
          'Địa chỉ Facebook chưa đúng định dạng',
        ),
      ],
    },
    user,
  )
  const updateProfileService = useAsync(userService.updateProfile)

  async function handleOnSubmit(ev) {
    ev.preventDefault()

    try {
      if (isValid() === true) {
        const cloneValues = { ...values }
        for (const key in cloneValues) {
          if (typeof cloneValues[key] === 'string') {
            cloneValues[key] = cloneValues[key].trim()
          }
        }

        const response = await updateProfileService.excute(cloneValues)
        if (response?.data) {
          setUser(response.data)
          toast.success('Cập nhật thông tin thành công')
        }
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <form className="tab1" noValidate onSubmit={handleOnSubmit}>
      <TextField
        label="Họ và tên"
        required
        placeholder="Bruce Wayne"
        classNameError="!w-full !text-xs"
        {...register('name')}
      />
      <TextField
        label="Số điện thoại"
        required
        placeholder="0949******"
        classNameError="!w-full !text-xs"
        {...register('phone')}
      />
      <TextField
        label="Email"
        required
        placeholder="bruce@wayne.com"
        classNameError="!w-full !text-xs"
        defaultValue={user.username}
        disabled
      />
      <TextField
        label="Facebook"
        required
        placeholder="Facebook URL"
        classNameError="!w-full !text-xs"
        {...register('fb')}
      />
      <Button
        disabled={updateProfileService.status === SERVICE_STATUS.pending}
        isLoading={updateProfileService.status === SERVICE_STATUS.pending}
        className="btn main rect"
      >
        LƯU LẠI
      </Button>
    </form>
  )
}
