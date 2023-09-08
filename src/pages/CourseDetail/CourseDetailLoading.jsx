import { Skeleton } from '@/components/Skeleton'

export default function CourseDetailLoading() {
  return (
    <main className="course-detail" id="main">
      <section className="banner style2" style={{ '--background': '#cde6fb' }}>
        <div className="container">
          <div className="info">
            <h1>
              <Skeleton height={64} width={500} />
            </h1>
            <div className="row">
              <div className="date">
                <Skeleton height={24} width={200} />
              </div>
              <div className="time">
                <Skeleton height={24} width={200} />
              </div>
            </div>
            <span className="mt-10 white round">
              <Skeleton height={46} width={140} />
            </span>
          </div>
        </div>
        <div className="bottom">
          <div className="container">
            <div className="video">
              <div className="icon">
                <Skeleton shap="circle" height={45} width={45} />
              </div>{' '}
              <Skeleton height={20} width={80} />
            </div>
            <div className="money mt-3">
              <Skeleton height={27} width={124} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-2">
        <div className="container">
          <p className="des">
            {Array.from(Array(10)).map((_, i) => {
              return <Skeleton key={i} height={35} />
            })}
          </p>
        </div>
      </section>
    </main>
  )
}
