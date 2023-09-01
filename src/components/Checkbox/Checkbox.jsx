export default function Checkbox({ children }) {
  return (
    <>
      <div className="check-container">
        {children}
        <input type="checkbox" />
        <span className="checkmark" />
      </div>
    </>
  )
}
