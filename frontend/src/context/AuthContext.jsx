import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  // Loading state — untuk cek session saat pertama kali app dibuka
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  const navigate = useNavigate()

  // Verifikasi token ke server saat app pertama kali dibuka
  // Mencegah user yang tokennya sudah expired tapi masih punya data di localStorage

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoadingAuth(false)
        return
      }
      try {
        const res = await api.get('/auth/me')
        setUser(res.data.user)
        localStorage.setItem('user', JSON.stringify(res.data.user))
      } catch {
        // Token tidak valid — bersihkan storage
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
      } finally {
        setIsLoadingAuth(false)
      }
    }
    verifySession()
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    setUser(res.data.user)
    navigate('/dashboard')
  }

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    setUser(res.data.user)
    navigate('/onboarding')
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  // Untuk update data user di context setelah edit profil / upload foto tanpa harus logout-login ulang
  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoadingAuth, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)