import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

const Button = memo(function Button({ children, className, isLoading, ...rest }) {
  return (
    <button
      className={twMerge('btn main rect disabled:cursor-not-allowed disabled:opacity-70', className && className)}
      {...rest}
    >
      {isLoading === true && (
        <span className="mr-2 inline-block h-[20px] w-[20px] animate-spin rounded-[50%] border-[3px] border-solid border-white border-b-transparent"></span>
      )}
      {children}
    </button>
  )
})

export default Button
