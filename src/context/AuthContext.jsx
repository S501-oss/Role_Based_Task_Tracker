import { createContext, useContext, useEffect, useState } from 'react'
import { useData } from './DataContext.jsx'
import { storage } from '../utils/storage.js'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const { users, addUser } = useData()
  const [user, setUser] = useState(storage.get('currentUser', null))

  useEffect(() => {
    storage.set('currentUser', user)
  }, [user])

  const login = (email, password) => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!found) throw new Error('Invalid email or password')
    setUser(found)
  }

  const register = ({ name, email, password, role }) => {
    const created = addUser({ name, email, password, role })
    setUser(created)
  }

  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)