import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch (error) {
      return null
    }
  })

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  function login() {
    setUser({
      name: 'Dang Thuyen Vuong',
      avatar: '/img/logo.svg',
    })
  }

  function logout() {
    setUser(null)
    localStorage.clear('user')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
