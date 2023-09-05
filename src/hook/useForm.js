import { validate } from '@/utils/validate'
import { useState } from 'react'

/**
 *
 * @param {*} rules
 * @returns values, errors, register
 */
export default function useForm(rules) {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})

  function register(name) {
    return {
      error: errors[name],
      value: values[name] || '',
      onChange: (ev) => setValues((values) => ({ ...values, [name]: ev.target.value })),
    }
  }

  function isValid() {
    const errorObject = validate(rules, values)
    setErrors(errorObject)

    return Object.keys(errorObject).length === 0
  }

  function resetValues() {
    setValues({})
  }

  return {
    values,
    errors,
    register,
    isValid,
    resetValues,
  }
}
