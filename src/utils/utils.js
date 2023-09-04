export function formatCurrency(currency) {
  return Intl.NumberFormat('de-DE').format(currency)
}

export function getIdFromParams(params) {
  const arr = params.split('-id')

  return arr[arr.length - 1]
}
