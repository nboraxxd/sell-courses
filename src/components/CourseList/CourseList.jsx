import { useState } from 'react'
import { CourseCard } from '@/components/CourseCard'
import { coursesService } from '@/services/courses'

export default function CourseList() {
  const [courseList] = useState(() => coursesService.getCourses())

  return (
    <div className="list row">
      {courseList?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
