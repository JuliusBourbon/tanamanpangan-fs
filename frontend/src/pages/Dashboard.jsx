import { useAuth } from '../context/AuthContext'
import { usePreferences } from '../context/PreferencesContext'

export default function Dashboard() {
  const { preferences } = usePreferences()
  const isId = preferences.language === 'id'
  const { user, logout } = useAuth();

  return (
    <header className="mb-8 flex justify-between items-end">
      <div>
        <h1 className="text-5xl font-bold tracking-tight mb-2 text-[#222222]">Dashboard</h1>
        <p className="text-slate-600">{isId ? 'Ringkasan aktivitas pemindaian Anda' : 'Summary of your scan activity'}</p>
      </div>
      <div className="text-right">
        <p className="text-xl text-slate-500">
          Afternoon, <span className="font-bold text-[#222222]">{user?.name}</span>
        </p>
        <button className="mt-4 bg-[#1E6436] text-white px-4 py-2 rounded text-sm hover:bg-green-800 transition-colors">
          + New Scan
        </button>
        <button className='text-red-500 ml-4' onClick={logout} title="Keluar">
          Logout
        </button>
      </div>
    </header>
  );
}