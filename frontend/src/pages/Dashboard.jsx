import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div>
        <h1>Selamat Datang {user.name} {user.email}</h1>
        <button className='text-red-500' onClick={logout} title="Keluar">
            Logout
          </button>
    </div>

  )
}
