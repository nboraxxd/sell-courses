import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import PATH from '@/constants/path'
import organizationService from '@/services/organization.service'
import { regexp, required } from '@/utils/validate'
import useForm from '@/hook/useForm'
import { TextField } from '@/components/TextField'
import { Button } from '@/components/Button'

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { values, register, isValid, resetValues } = useForm({
    name: [required('Vui lòng nhập họ và tên của bạn')],
    email: [required('Vui lòng nhập email của bạn'), regexp('email', 'Email chưa đúng định dạng')],
    phone: [required('Vui lòng nhập số điện thoại của bạn'), regexp('phone', 'Số điện thoại chưa đúng định dạng')],
    website: [
      regexp(
        /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
        'Đường dẫn website chưa đúng định dạng',
      ),
    ],
    title: [required('Vui lòng nhập tiêu đề liên hệ')],
    content: [required('Vui lòng nhập nội dung liên hệ')],
  })

  async function handleOnSubmit(ev) {
    ev.preventDefault()

    try {
      if (isValid() === true) {
        setIsLoading(true)
        const cloneValues = { ...values }
        for (const key in cloneValues) {
          if (typeof cloneValues[key] === 'string') {
            cloneValues[key] = cloneValues[key].trim()
          }
        }

        const response = await organizationService.contact(cloneValues)
        if (response.data.success === true) {
          toast.success('Bạn đã gởi liên hệ thành công!')
          setIsSuccess(true)
          resetValues()
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main id="main">
      <div className="register-course">
        {isSuccess ? (
          <div className="register-success">
            <div className="contain">
              <div className="main-title">Liên hệ thành công</div>
              <p>
                Thông tin liên hệ của bạn đã được gửi, chúng tôi sẽ chủ động liên lạc với bạn trong thời gian sớm nhất.
                Cảm ơn bạn đã tin tưởng và ủng hộ Spacedev.
              </p>
            </div>
            <Link to={PATH.homePage} className="btn main rect">
              về trang chủ
            </Link>
          </div>
        ) : (
          <section className="section-1 wrap container">
            <h1 className="main-title">HỢP TÁC CÙNG SPACEDEV</h1>
            <p className="top-des">
              Đừng ngần ngại liên hệ với <strong>Spacedev</strong> để cùng nhau tạo ra những sản phẩm giá trị, cũng như
              việc hợp tác với các đối tác tuyển dụng và công ty trong và ngoài nước.
            </p>
            <form className="form" onSubmit={handleOnSubmit} noValidate>
              {/* Name Input */}
              <TextField label="Họ và tên" required placeholder="Họ và tên của bạn" {...register('name')} />
              {/* Phone Input */}
              <TextField label="Số điện thoại" required placeholder="Số điện thoại của bạn" {...register('phone')} />
              {/* Email Input */}
              <TextField label="Email" required type="email" placeholder="Email của bạn" {...register('email')} />
              {/* Website Input */}
              <TextField label="Website" placeholder="Đường dẫn website http://" {...register('website')} />
              {/* Contact Title Input */}
              <TextField label="Tiêu đề" required placeholder="Tiêu đề liên hệ" {...register('title')} />
              {/* Contact Content Textarea */}
              <TextField
                label="Nội dung"
                required
                {...register('content')}
                render={(props) => <textarea {...props} cols={30} rows={10} />}
              />
              <Button disabled={isLoading} isLoading={isLoading}>
                Gửi liên hệ
              </Button>
            </form>
          </section>
        )}
      </div>
    </main>
  )
}
