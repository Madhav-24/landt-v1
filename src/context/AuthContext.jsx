import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { DEMO_EMAIL, TOKEN_KEY, USER_KEY } from '../utils/constants'
import { login as loginService } from '../services/dashboardService'

const AuthContext = createContext(null)

function readStoredAuth() {
  try {
    const rawUser = localStorage.getItem(USER_KEY)
    const rawToken = localStorage.getItem(TOKEN_KEY)
    return { user: rawUser ? JSON.parse(rawUser) : null, token: rawToken }
  } catch {
    return { user: null, token: null }
  }
}

export function AuthProvider({ children }) {
  const stored = readStoredAuth()
  const [user, setUser] = useState(stored.user)
  const [token, setToken] = useState(stored.token)

  useEffect(() => {
    if (user && token) {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
      localStorage.setItem(TOKEN_KEY, token)
    }
  }, [user, token])

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      async login(credentials) {
        const response = await loginService(credentials)
        const nextUser = { ...response.user, email: response.user.email ?? DEMO_EMAIL }
        setUser(nextUser)
        setToken(response.token)
        return nextUser
      },
      logout() {
        setUser(null)
        setToken(null)
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(TOKEN_KEY)
      },
    }),
    [token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
