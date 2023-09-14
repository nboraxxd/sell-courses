import { SERVICE_STATUS } from '@/constants/serviceStatus'
import { localStorageCache } from '@/utils/cache'
import { useEffect, useState } from 'react'

export default function useQuery(options = {}) {
  const {
    queryFn, // Function dùng để gọi API
    queryKey, // Tên key để lưu trữ data trong cache
    cacheTime, // Thời gian data tồn tại trong cache
  } = options

  const [data, setData] = useState(null) // Dùng state để giữ data của queryFn
  const [status, setStatus] = useState(SERVICE_STATUS.idle)
  const [error, setError] = useState()

  useEffect(() => {
    ;(async function () {
      try {
        setStatus(SERVICE_STATUS.pending)

        let response
        // Nếu có queryKey thì lấy data từ cache ra
        if (queryKey) {
          response = localStorageCache.get(queryKey)
        }

        // Sau khi đã lấy data từ trong cache ra thì kiểm tra lại response
        // Nếu response vẫn không có data thì gọi hàm queryFn để lấy dữ liệu từ server
        if (Boolean(response) === false) {
          response = await queryFn()
        }

        setData(response)
        setStatus(SERVICE_STATUS.successful)

        if (queryKey) {
          let expired = cacheTime
          // Kiểm tra nếu có cacheTime thì expired sẽ bằng expired + Date.now()
          // Làm vậy để truyền expired vào trong cache.set như một argument
          if (cacheTime) {
            expired = expired + Date.now()
          }

          localStorageCache.set(queryKey, response, expired)
        }
      } catch (err) {
        setError(err)
        setStatus(SERVICE_STATUS.rejected)
      }
    })()
  }, [cacheTime, queryFn, queryKey])

  return {
    data,
    status,
    error,
  }
}
