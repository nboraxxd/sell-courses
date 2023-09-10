export default function TextField({ label, labelStyle = '', required, type = 'text', render, error, ...rest }) {
  return (
    <label style={{ ...labelStyle }}>
      <p>
        {label}
        {required && <span>*</span>}
      </p>
      <div className="grow">
        {render ? render(rest) : <input type={type} {...rest} />}
        <p className="error !mb-1 mt-[0.125rem] min-h-[1.125rem] text-xs italic text-red-500">{error}</p>
      </div>
    </label>
  )
}
