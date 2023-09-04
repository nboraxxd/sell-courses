export default function Register() {
  return (
    <main id="main">
      <div className="auth">
        <form className="wrap">
          <h2 className="title">Đăng ký</h2>
          <input type="email" placeholder="Địa chỉ Email" />
          <p className="error !mb-1 mt-[0.125rem] min-h-[1.125rem] text-xs italic text-red-500"></p>
          <input placeholder="Họ và tên" />
          <p className="error !mb-1 mt-[0.125rem] min-h-[1.125rem] text-xs italic text-red-500"></p>
          <input type="password" placeholder="Mật khẩu" />
          <p className="error !mb-1 mt-[0.125rem] min-h-[1.125rem] text-xs italic text-red-500"></p>
          <input type="password" placeholder="Nhập lại mật khẩu" />
          <p className="error !mb-1 mt-[0.125rem] min-h-[1.125rem] text-xs italic text-red-500"></p>
          <p className="policy">
            Bằng việc đăng kí, bạn đã đồng ý <a href="#">Điều khoản bảo mật</a> của Spacedev
          </p>
          <button className="btn rect main btn-login">Đăng ký</button>
        </form>
      </div>
    </main>
  )
}
