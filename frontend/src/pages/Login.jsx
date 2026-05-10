import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div >

          <form onSubmit={handleSubmit} >
            <label>Email</label><br />
            <input
                name="email"
                type="email"
                placeholder="nama@email.com"
                value={form.email}
                onChange={handleChange}
                required
            /> <br />

              <label>Password</label><br />
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              /> <br />

            <button
              type="submit"
              disabled={loading}
              className='border'
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <p >
            Belum punya akun?{' '}
            <Link to="/register" className='underline'>Daftar sekarang</Link>
          </p>
    </div>
  )
}