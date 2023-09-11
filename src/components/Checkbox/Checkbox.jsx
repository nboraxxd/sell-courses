export default function Checkbox({ children, value, onChange }) {
  function onChangeCheckbox(ev) {
    onChange && onChange({ target: { value: ev.target.checked } })
  }

  return (
    <>
      <div className="check-container">
        {children}
        <input type="checkbox" checked={value} onChange={onChangeCheckbox} />
        <span className="checkmark" />
      </div>
    </>
  )
}
