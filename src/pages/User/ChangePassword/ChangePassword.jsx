export default function ChangePassword() {
  return (
    <div className="tab4">
      <label>
        <p>
          Mật khẩu cũ<span>*</span>
        </p>
        <input type="password" placeholder="Mật khẩu cũ" />
      </label>
      <label>
        <p>
          Mật khẩu mới<span>*</span>
        </p>
        <input type="password" placeholder="Mật khẩu mới" />
      </label>
      <label>
        <p>
          Xác nhận<span>*</span>
        </p>
        <input type="password" placeholder="Xác nhận mật khẩu" />
      </label>
      <div className="btn main rect">LƯU LẠI</div>
    </div>
  )
}
