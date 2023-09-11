import { useState } from 'react'
import { useParams } from 'react-router-dom'
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

export default function CourseRegister() {
  const params = useParams()
  const id = getIdFromParams(params.id)
  useScrollTop([id])

  const { data, status } = useFetch(() => coursesService.getCourseDetail(id))
  const courseDetail = data?.data

  const [isSuccess, setIsSuccess] = useState(false)

  const { register, values, isValid } = useForm({
    name: [required('Vui lòng nhập họ và tên của bạn')],
    email: [required('Vui lòng nhập email của bạn'), regexp('email', 'Email chưa đúng định dạng')],
    phone: [required('Vui lòng nhập số điện thoại của bạn'), regexp('phone', 'Số điện thoại chưa đúng định dạng')],
    fb: [
      regexp(
        /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/,
        'Địa chỉ Facebook chưa đúng định dạng',
      ),
    ],
    payment: [required('Vui lòng chọn hình thức thanh toán')],
  })

  function handleOnSubmit(ev) {
    ev.preventDefault()

    if (isValid() === true) {
      const cloneValues = { ...values }
      for (const key in cloneValues) {
        if (typeof cloneValues[key] === 'string') {
          cloneValues[key] = cloneValues[key].trim()
        }
      }
      setIsSuccess(true)
    }
  }

  if (status === SERVICE_STATUS.idle || status === SERVICE_STATUS.pending) {
    return <CourseRegisterLoading />
  }

  return status === SERVICE_STATUS.successful && courseDetail === null ? (
    <Page404 desc="Không tìm thấy khoá học" to={PATH.courses} linkText="Danh sách khóa học" />
  ) : (
    <main id="main">
      <section className="register-course">
        {isSuccess ? (
          <div className="register-success" style={{ margin: '40px auto' }}>
            <div className="contain">
              <div className="main-title">đăng ký thành công</div>
              <p>
                <strong>Chào mừng {values.name} đã trở thành thành viên mới của khoá học [abc].</strong>
                <br />
                Cảm ơn bạn đã đăng ký khoá học tại <strong>Spacedev</strong>, chúng tôi sẽ chủ động liên lạc với bạn
                thông qua facebook hoặc số điện thoại của bạn.
              </p>
            </div>
            {/* <Link to={PATH.profile.course} className="btn main rect">
            về trang khoá học của tôi
          </Link> */}
          </div>
        ) : (
          <div className="container">
            <div className="wrap container">
              <div className="main-sub-title">ĐĂNG KÝ</div>
              <h1 className="main-title">{courseDetail.title}</h1>
              <div className="main-info">
                <div className="date">
                  <strong>Khai giảng:</strong> 15/11/2020
                </div>
                <div className="time">
                  <strong>Thời lượng:</strong> 18 buổi
                </div>
                <div className="time">
                  <strong>Học phí:</strong> <span>{formatCurrency(courseDetail.money)}</span>
                  <span>₫</span>
                </div>
              </div>
              <form className="form" noValidate onSubmit={handleOnSubmit}>
                {/* Name Input */}
                <TextField label="Họ và tên" required placeholder="Họ và tên của bạn" {...register('name')} />

                {/* Email Input */}
                <TextField label="Email" type="email" required placeholder="Email của bạn" {...register('email')} />

                {/* Phone Input */}
                <TextField label="Số điện thoại" required placeholder="Số điện thoại của bạn" {...register('phone')} />

                {/* Facebook URL */}
                <TextField label="Địa chỉ Facebook" placeholder="https://www.facebook.com/" {...register('fb')} />

                {/* COIN */}
                <TextField
                  labelStyle={{ alignItems: 'flex-start' }}
                  label="Sử dụng COIN"
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

                {/* Opinion */}
                <TextField
                  label="Ý kiến cá nhân"
                  placeholder="Mong muốn cá nhân và lịch bạn có thể học"
                  {...register('opinion')}
                />
                <Button className="btn main rect">đăng ký</Button>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
