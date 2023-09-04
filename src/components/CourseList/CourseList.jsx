import { CourseCard } from '@/components/CourseCard'

export default function CourseList({ courses }) {
  return (
    <div className="list row">
      {courses?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
