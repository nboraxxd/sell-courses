import { useEffect, useState } from 'react'
import { SERVICE_STATUS } from '@/constants/serviceStatus'

export default function (promise, dependencyList = []) {
  const [status, setStatus] = useState(SERVICE_STATUS.idle)
  const [data, setData] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        setStatus(SERVICE_STATUS.pending)

        const response = await promise()

        setData(response)
        setStatus(SERVICE_STATUS.successful)
      } catch (err) {
        setError(err)
        setStatus(SERVICE_STATUS.rejected)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyList)

  return {
    error,
    status,
    data,
  }
}
