import { twMerge } from 'tailwind-merge'

export default function TextField({
  label,
  labelStyle = '',
  required,
  type = 'text',
  render,
  error,
  classNameError,
  ...rest
}) {
  return (
    <label style={{ ...labelStyle }}>
      <p className='mb-6'>
        {label}
        {required && <span>*</span>}
      </p>
      <div className="grow">
        {render ? render(rest) : <input className="w-full" type={type} {...rest} />}
        <p
          className={twMerge(
            'error !mb-1 mt-[0.125rem] min-h-[1.125rem] text-xs italic text-red-500',
            classNameError && classNameError,
          )}
        >
          {error}
        </p>
      </div>
    </label>
  )
}
