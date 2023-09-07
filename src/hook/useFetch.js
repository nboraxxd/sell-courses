import { useEffect, useState } from 'react'

export default function (promise) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState()

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        setIsLoading(true)
        setStatus('pending')

        const response = await promise()

        setData(response.data)
        setStatus('success')
      } catch (err) {
        setError(err)
        setStatus('error')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [promise])

  return {
    isLoading,
    error,
    status,
    data,
  }
}
