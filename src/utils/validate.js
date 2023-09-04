const DEFAULT_ERROR_MESSAGE = {
  required: 'Trường này là bắt buộc',
  regexp: 'Vui lòng điền đúng định dạng',
  min: (min) => `Trường này phải có tối thiểu ${min} ký tự`,
  max: (max) => `Trường này chỉ được phép có tối đa ${max} ký tự`,
}

const REGEXP = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phone: /((84|0[3|5|7|8|9])+([0-9]{8})|(84[3|5|7|8|9])+([0-9]{8}))\b/,
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
      if (rule.required && forms[key] === undefined) {
        errorObject[key] = rule.message || DEFAULT_ERROR_MESSAGE.required
      }

      if (rule.min && typeof rule.min === 'number' && forms[key]?.length < rule.min) {
        errorObject[key] = rule.message || DEFAULT_ERROR_MESSAGE.min(rule.min)
      }

      if (rule.max && typeof rule.max === 'number' && forms[key]?.length > rule.max) {
        errorObject[key] = rule.message || DEFAULT_ERROR_MESSAGE.max(rule.max)
      }

      if (rule.regexp && forms[key] !== undefined) {
        let _regexp = rule.regexp
        if (_regexp in REGEXP) {
          _regexp = REGEXP[_regexp]
        } else if (_regexp instanceof RegExp === false) {
          _regexp = new RegExp()
        }

        if (_regexp.test(forms[key]) === false) {
          errorObject[key] = rule.message || DEFAULT_ERROR_MESSAGE.regexp
        }
      }
    }
  }

  return errorObject
}

export function required(message) {
  return {
    required: true,
    message,
  }
}

export function regexp(pattern, message) {
  return {
    regexp: pattern,
    message,
  }
}

export function min(min, message) {
  return {
    min,
    message,
  }
}

export function max(max, message) {
  return {
    max,
    message,
  }
}
