import PATH from '@/constants/path'
import { Link } from 'react-router-dom'

export default function Page404({
  errorCode = 404,
  desc = 'Không tìm thấy trang',
  to = PATH.homePage,
  linkText = 'Về trang chủ',
}) {
  return (
    <main id="main">
      <div className="notfound">
        <div className="container">
          <section className="flex h-[45rem] w-full flex-col items-center justify-center">
            <h1 className="mb-10 text-9xl font-extrabold tracking-widest text-[#db3244]">{errorCode}</h1>
            <div className="absolute rotate-12 rounded bg-[#1A2238] px-2 text-sm text-white">{desc}</div>
            <Link to={to} className="btn main round">
              {linkText}
            </Link>
          </section>
        </div>
      </div>
    </main>
  )
}
