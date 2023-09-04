import { TextField } from '@/components/TextField'
import useForm from '@/hook/useForm'
import { regexp, required } from '@/utils/validate'

export default function Contact() {
  const { values, errors, register, isValid } = useForm({
    name: [required('Vui lòng nhập họ và tên của bạn')],
    email: [required('Vui lòng nhập email của bạn'), regexp('email', 'Email chưa đúng định dạng')],
    phone: [required('Vui lòng nhập số điện thoại của bạn', regexp('phone', 'Số điện thoại chưa đúng định dạng'))],
    website: [
      regexp(
        /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
        'Đường dẫn website chưa đúng định dạng',
      ),
    ],
    title: [required('Vui lòng nhập tiêu đề liên hệ')],
    content: [required('Vui lòng nhập nội dung liên hệ')],
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
      console.log('Validate success', cloneValues)
    } else {
      console.log('Validate error', errors)
    }
  }

  return (
    <main id="main">
      <div className="register-course">
        <section className="section-1 wrap container">
          <h2 className="main-title">HỢP TÁC CÙNG Spacedev</h2>
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
            <button className="btn main rect">đăng ký</button>
          </form>
        </section>
      </div>
    </main>
  )
}
