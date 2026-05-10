import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError('Password dan konfirmasi password tidak cocok.')
      return
    }
    if (form.password.length < 6) {
      setError('Password minimal 6 karakter.')
      return
    }
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>

          <h2>Buat akun baru</h2>

          {error && <div>{error}</div>}

          <form onSubmit={handleSubmit}>
              <label>Nama lengkap</label><br />
              <input
                name="name"
                type="text"
                placeholder="Nama kamu"
                value={form.name}
                onChange={handleChange}
                required
              /><br />

              <label>Email</label><br />
              <input
                name="email"
                type="email"
                placeholder="nama@email.com"
                value={form.email}
                onChange={handleChange}
                required
              /><br />

              <label>Password</label><br />
              <input
                name="password"
                type="password"
                placeholder="Min. 6 karakter"
                value={form.password}
                onChange={handleChange}
                required
              /><br />

              <label>Konfirmasi password</label><br />
              <input
                name="confirm"
                type="password"
                placeholder="Ulangi password"
                value={form.confirm}
                onChange={handleChange}
                required
              /><br />

            <button
              type="submit"
              disabled={loading} className='border'
            >
              {loading ? 'Mendaftarkan...' : 'Daftar sekarang'}
            </button>
          </form>

          <p>
            Sudah punya akun?{' '}
            <Link to="/login" className='underline'>Masuk di sini</Link>
          </p>
    </div>
  )
}