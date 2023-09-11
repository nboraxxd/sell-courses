import { useState } from 'react'
import { SERVICE_STATUS } from '@/constants/serviceStatus'

export default function useAsync(promise) {
  const [status, setStatus] = useState(SERVICE_STATUS.idle)
  const [data, setData] = useState()
  const [error, setError] = useState()

  async function excute(...body) {
    try {
      setStatus(SERVICE_STATUS.pending)

      const response = await promise(...body)
      setData(response)
      setStatus(SERVICE_STATUS.successful)

      return response
    } catch (err) {
      setError(err)
      setStatus(SERVICE_STATUS.rejected)
      throw err
    }
  }

  return { status, data, error, excute }
}
