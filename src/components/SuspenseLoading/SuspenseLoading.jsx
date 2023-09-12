import { twMerge } from 'tailwind-merge'
import './styles.css'

export default function SuspenseLoading({ className }) {
  return (
    <div className={twMerge('flex h-screen w-full flex-col items-center justify-center', className && className)}>
      <div className="loader flex space-x-2 rounded-full p-4">
        <div className="h-3 w-3 animate-bounce rounded-full bg-[#db3244]" />
        <div className="h-3 w-3 animate-bounce rounded-full bg-[#db3244]" />
        <div className="h-3 w-3 animate-bounce rounded-full bg-[#db3244]" />
      </div>
    </div>
  )
}
