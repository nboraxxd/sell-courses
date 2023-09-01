// const rules = {
//   name: [{ required: true }],
//   email: [
//     { required: true, message: 'Vui lòng nhập email của bạn' },
//     { regexp: '/^[w-.]+@([w-]+.)+[w-]{2,4}$/', message: 'Email chưa đúng định dạng' },
//   ],
// }

// const form = {
//   name: 'Velit',
//   email: 'huzatok@mailinator.com',
// }

// const errorObject = {
//   email: 'Vui lòng nhập email của bạn',
// }

const DEFAULT_ERROR_MESSAGE = {
  required: 'Trường này là bắt buộc',
  regexp: 'Vui lòng điền đúng định dạng',
}

/**
 * @param {*} rules
 * @param {*} forms
 * @returns plan error object
 */
export function validate(rules, forms) {
  const errorObject = {}

  for (const key in rules) {
    for (const rule of rules[key]) {
      if (rule.required && forms[key]?.trim() === undefined) {
        errorObject[key] = rule.message || DEFAULT_ERROR_MESSAGE.required
      }

      if (rule.regexp && forms[key]?.trim() !== undefined) {
        if (rule.regexp.test(forms[key].trim()) === false) {
          errorObject[key] = rule.message || DEFAULT_ERROR_MESSAGE.regexp
        }
      }
    }
  }

  return errorObject
}
