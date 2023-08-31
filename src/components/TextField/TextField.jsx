export default function TextField({ label, required, type = 'text', render, ...rest }) {
  return (
    <label>
      <p>
        {label}
        {required && <span>*</span>}
      </p>
      {render ? render(rest) : <input type={type} {...rest} />}
    </label>
  )
}
