import { Skeleton } from '../Skeleton'

export default function CourseCardLoading() {
  return (
    <div className="col-md-4 course">
      <div className="wrap">
        <div className="cover" to="#">
          <Skeleton height="100%" />
        </div>
        <div className="info">
          <div className="name" to="#">
            <Skeleton height={30} />
          </div>
          <p className="des">
            <Skeleton height={22} />
            <Skeleton height={22} />
            <Skeleton height={22} />
          </p>
        </div>
        <div className="bottom" style={{ borderColor: 'transparent' }}>
          <div className="teacher" style={{ borderColor: 'transparent' }}>
            <div className="avatar">
              <Skeleton shap="circle" height={36} width={36} />
            </div>
            <div className="name mt-1">
              <Skeleton height={24} width={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
