import { Skeleton } from '@/components/Skeleton'

export default function CourseRegisterLoading() {
  return (
    <main className="register-course" id="main">
      <section>
        <div className="container">
          <div className="wrap container">
            <div className="main-sub-title">
              <Skeleton height={21} />
            </div>
            <h1 className="main-title">
              <Skeleton height={53} />
            </h1>
            <div className="main-info">
              <Skeleton height={21} />
            </div>

            <div className="form text-center">
              {Array.from(Array(7)).map((_, i) => {
                return <Skeleton key={i} className="mb-[25px]" height={55} width="80%" />
              })}
            </div>
            <Skeleton height={54} />
          </div>
        </div>
      </section>
    </main>
  )
}
