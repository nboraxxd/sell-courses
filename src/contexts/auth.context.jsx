import { createContext, useState } from 'react'

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function login() {
    setUser({
      name: 'Dang Thuyen Vuong',
      avatar: '/img/logo.svg',
    })
  }

  return <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>
}
