import PATH from '@/constants/path'
import { Link, createSearchParams } from 'react-router-dom'

export default function Pagination({ queryParams, totalPage }) {
  function changePage(pageNumber) {
    return { pathname: PATH.courses, search: createSearchParams({ ...queryParams, page: pageNumber }).toString() }
  }

  return (
    <div className="paginate">
      {Object.keys(queryParams).length === 0 || Number(queryParams.page) === 1 ? (
        <span className="prev cursor-not-allowed opacity-50 hover:!text-black">Trang trước</span>
      ) : (
        <Link to={changePage(Number(queryParams.page) - 1)} className="prev">
          Trang trước
        </Link>
      )}
      {Array.from(Array(totalPage)).map((_, i) => {
        const pageNumber = i + 1
        return (
          <Link
            key={i}
            to={changePage(pageNumber)}
            className={`item ${
              (pageNumber === 1 && Object.keys(queryParams).length === 0) || pageNumber === Number(queryParams.page)
                ? 'active'
                : ''
            }`}
          >
            {pageNumber}
          </Link>
        )
      })}
      {Number(queryParams.page) === Number(totalPage) ? (
        <span className="prev cursor-not-allowed opacity-50 hover:!text-black">Trang sau</span>
      ) : (
        <Link to={changePage((Number(queryParams.page) || 1) + 1)} className="next">
          Trang sau
        </Link>
      )}
    </div>
  )
}
