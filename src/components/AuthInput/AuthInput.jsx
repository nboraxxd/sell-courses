export default function AuthInput({ type = 'text', error, ...rest }) {
  return (
    <>
      <input type={type} {...rest} />
      <p className="error !mb-1 mt-[0.125rem] min-h-[1.125rem] text-xs italic text-red-500">{error}</p>
    </>
  )
}
