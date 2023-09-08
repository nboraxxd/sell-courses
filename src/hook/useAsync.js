import { useState } from 'react'

export default function (promise) {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState()
  const [error, setError] = useState()

  async function excute(...body) {
    try {
      setStatus('pending')

      const response = await promise(...body)
      setData(response)
      setStatus('successful')

      return response
    } catch (err) {
      setError(err)
      setStatus('rejected')
      throw err
    }
  }

  return { status, data, error, excute }
}
