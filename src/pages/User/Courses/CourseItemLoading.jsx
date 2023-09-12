import { Skeleton } from '@/components/Skeleton'

export default function CourseItemLoading() {
  return (
    <div className="item">
      <div className="cover h-80 md:h-64">
        <Skeleton height="100%" className="rounded-none" />
      </div>
      <div className="info">
        <Skeleton height={30} />
        <Skeleton height={22} className="mt-1" />
        <Skeleton height={22} className="mt-1" />
        <Skeleton height={22} className="mt-1" />
        <div className="mt-4">
          <Skeleton height={46} width={130} className="rounded-full" />
        </div>
      </div>
    </div>
  )
}
