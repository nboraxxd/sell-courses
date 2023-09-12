import PATH from '@/constants/path'
import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error: ', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex h-screen w-full flex-col items-center justify-center">
          <h1 className="text-9xl font-extrabold tracking-widest text-[#db3244]">500</h1>
          <div className="absolute rotate-12 rounded bg-[#1A2238] px-2 text-sm text-white">Lỗi không mong muốn</div>
          <button className="mt-5">
            <div className="group relative inline-block bg-[#db3244] text-sm font-medium focus:outline-none focus:ring active:text-orange-500">
              <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#7c121c] transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
              <span className="relative block border border-current bg-[#db3244] px-8 py-3">
                <a href={PATH.contact} className="text-white">
                  Liên hệ với chúng tôi
                </a>
              </span>
            </div>
          </button>
        </main>
      )
    }

    return this.props.children
  }
}
