import { memo } from 'react'

const AuthInput = memo(
  function AuthInput({ type = 'text', error, ...rest }) {
    return (
      <>
        <input type={type} {...rest} className={error ? '!border-red-300 text-red-500 placeholder:text-red-400' : ''} />
        <p className="error !mb-1 mt-[0.125rem] min-h-[1.125rem] text-xs italic text-red-500">{error}</p>
      </>
    )
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.error === nextProps.error,
)

export default AuthInput
