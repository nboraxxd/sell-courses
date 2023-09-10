import { forwardRef, useImperativeHandle, useRef } from 'react'

const TextField = forwardRef(({ label, labelStyle = '', required, type = 'text', render, error, ...rest }, ref) => {
  const inputRef = useRef()

  useImperativeHandle(
    ref,
    () => {
      return {
        setValue(value) {
          inputRef.current.value = value
        },
      }
    },
    [],
  )

  return (
    <label style={{ ...labelStyle }}>
      <p>
        {label}
        {required && <span>*</span>}
      </p>
      <div className="grow">
        {render ? render(rest) : <input ref={inputRef} type={type} {...rest} />}
        <p className="error !mb-1 mt-[0.125rem] min-h-[1.125rem] text-xs italic text-red-500">{error}</p>
      </div>
    </label>
  )
})

export default TextField
