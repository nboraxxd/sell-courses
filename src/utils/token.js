const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export function setTokenToLS(data) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
}
export function getTokenFromLS() {
  return JSON.parse(localStorage.getItem(TOKEN_KEY))
}
export function clearTokenFromLS() {
  localStorage.removeItem(TOKEN_KEY)
}

export function setProfileUserToLS(data) {
  localStorage.setItem(USER_KEY, JSON.stringify(data))
}

export function getProfileUserFromLS() {
  return JSON.parse(localStorage.getItem(USER_KEY))
}

export function clearProfileUserFromLS() {
  localStorage.removeItem(USER_KEY)
}
