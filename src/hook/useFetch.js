import { useEffect, useState } from 'react'

export default function (promise, dependencyList = []) {
  const [error, setError] = useState()
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState()
  console.log(dependencyList)

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        setStatus('pending')

        const response = await promise()

        setData(response)
        setStatus('successful')
      } catch (err) {
        setError(err)
        setStatus('rejected')
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
