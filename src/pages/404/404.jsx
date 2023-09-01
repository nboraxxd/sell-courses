export default function Page404() {
  return (
    <main id="main">
      <div className="notfound">
        <div className="container">
          <section className="flex h-[45rem] w-full flex-col items-center justify-center">
            <h1 className="mb-10 text-9xl font-extrabold tracking-widest text-[#db3244]">404</h1>
            <div className="absolute rotate-12 rounded bg-[#1A2238] px-2 text-sm text-white">Không tìm thấy trang</div>
            <a href="/" className="btn main round">
              Trang chủ
            </a>
          </section>
        </div>
      </div>
    </main>
  )
}
