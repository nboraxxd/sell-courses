import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import coursesService from '@/services/courses.service'
import { regexp, required } from '@/utils/validate'
import { formatCurrency, getIdFromParams } from '@/utils/utils'
import useScrollTop from '@/hook/useScrollTop'
import useForm from '@/hook/useForm'
import { Checkbox } from '@/components/Checkbox'
import { TextField } from '@/components/TextField'
import useFetch from '@/hook/useFetch'
import CourseRegisterLoading from './CourseRegisterLoading'
import { Page404 } from '@/pages/404'
import PATH from '@/constants/path'
import { SERVICE_STATUS } from '@/constants/serviceStatus'
import { Select } from '@/components/Select'
import { Button } from '@/components/Button'
import useAsync from '@/hook/useAsync'
import { handleError } from '@/utils/handleError'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/contexts/auth.context'
import { toast } from 'sonner'

export default function CourseRegister() {
  const params = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user } = useContext(AuthContext)
  const id = getIdFromParams(params.id)
  useScrollTop([id])

  const CourseDetailService = useFetch(() => coursesService.getCourseDetail(id))
  const courseDetailData = CourseDetailService?.data?.data

  const { register, values, isValid } = useForm(
    {
      name: [required('Vui lòng nhập họ và tên của bạn')],
      phone: [required('Vui lòng nhập số điện thoại của bạn'), regexp('phone', 'Số điện thoại chưa đúng định dạng')],
      fb: [
        regexp(
          /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/,
          'Địa chỉ Facebook chưa đúng định dạng',
        ),
      ],
      payment: [required('Vui lòng chọn hình thức thanh toán')],
    },
    { email: user.username, name: user.name, fb: user.fb, phone: user.phone },
  )

  const courseRegisterService = useAsync(coursesService.courseRegister)

  useEffect(() => {
    if (Boolean(user) === false) {
      toast.error('Vui lòng đăng nhập trước khi đăng ký khoá học')
      navigate(PATH.signin, { state: { redirect: pathname } })
    }
  }, [navigate, pathname, user])

  async function handleOnSubmit(ev) {
    ev.preventDefault()

    if (isValid() === true) {
      try {
        const cloneValues = { ...values }
        for (const key in cloneValues) {
          if (typeof cloneValues[key] === 'string') {
            cloneValues[key] = cloneValues[key].trim()
          }
        }

        await courseRegisterService.excute(id, cloneValues)
      } catch (error) {
        handleError(error)
      }
    }
  }

  if (CourseDetailService.status === SERVICE_STATUS.idle || CourseDetailService.status === SERVICE_STATUS.pending) {
    return <CourseRegisterLoading />
  }

  return CourseDetailService.status === SERVICE_STATUS.successful && courseDetailData === null ? (
    <Page404 desc="Không tìm thấy khoá học" to={PATH.courses} linkText="Về trang danh sách khóa học" />
  ) : (
    <main id="main">
      <section className="register-course">
        {courseRegisterService.status === SERVICE_STATUS.successful ? (
          <div className="register-success mx-auto my-40 max-w-[43rem] bg-white">
            <div className="contain p-12 text-center">
              <h1 className="title text-2xl font-bold uppercase text-[#db3244]">đăng ký khóa học thành công</h1>
              <p className="mt-8">
                Cảm ơn bạn đã đăng ký khoá học tại <strong>Spacedev</strong>.
              </p>
              <p className="mt-1">Chúng tôi sẽ chủ động liên lạc với bạn trong thời gian sớm nhất.</p>
            </div>
            <Link to={PATH.user.courses} className="btn main rect">
              về trang khoá học của tôi
            </Link>
          </div>
        ) : (
          <div className="container">
            <div className="wrap container">
              <div className="main-sub-title">ĐĂNG KÝ</div>
              <h1 className="main-title">{courseDetailData.title}</h1>
              <div className="main-info">
                <div className="date">
                  <strong>Khai giảng:</strong> 15/11/2020
                </div>
                <div className="time">
                  <strong>Thời lượng:</strong> 18 buổi
                </div>
                <div className="time">
                  <strong>Học phí:</strong> <span>{formatCurrency(courseDetailData.money)}</span>
                  <span>₫</span>
                </div>
              </div>
              <form className="form" noValidate onSubmit={handleOnSubmit}>
                {/* Name Input */}
                <TextField label="Họ và tên" required placeholder="Họ và tên của bạn" {...register('name')} />

                {/* Email Input */}
                <TextField
                  label="Email"
                  type="email"
                  required
                  placeholder="Email của bạn"
                  {...register('email')}
                  disabled
                />

                {/* Phone Input */}
                <TextField label="Số điện thoại" required placeholder="Số điện thoại của bạn" {...register('phone')} />

                {/* Facebook URL */}
                <TextField label="Địa chỉ Facebook" placeholder="https://www.facebook.com/" {...register('fb')} />

                {/* COIN */}
                <TextField
                  labelStyle={{ alignItems: 'flex-start' }}
                  label="Sử dụng COIN"
                  {...register('coin')}
                  render={(props) => (
                    <Checkbox {...props}>
                      Hiện có <strong>300 COIN</strong>
                    </Checkbox>
                  )}
                />

                {/* Payment */}
                <TextField
                  label="Hình thức thanh toán"
                  {...register('payment')}
                  required
                  render={(props) => (
                    <Select
                      {...props}
                      placeholder="Hình thức thanh toán"
                      options={[
                        { value: 'chuyen-khoan', label: 'Chuyển khoản' },
                        { value: 'thanh-toan-tien-mat', label: 'Thanh toán tiền mặt' },
                      ]}
                    />
                  )}
                />

                {/* Note */}
                <TextField
                  label="Ý kiến cá nhân"
                  placeholder="Mong muốn cá nhân và lịch bạn có thể học"
                  {...register('note')}
                  render={(props) => <textarea {...props} cols={30} rows={10} />}
                />
                <Button
                  className="btn main rect"
                  type="submit"
                  disabled={courseRegisterService.status === SERVICE_STATUS.pending}
                  isLoading={courseRegisterService.status === SERVICE_STATUS.pending}
                >
                  đăng ký
                </Button>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
