export default function Checkbox({ onChange, value, children }) {
  const _onChange = (ev) => {
    onChange({ target: { value: ev.target.checked } })
  }

  return (
    <>
      <div className="check-container">
        {children}
        <input onChange={_onChange} checked={value} type="checkbox" />
        <span className="checkmark" />
      </div>
    </>
  )
}
