import { usePreferences } from '../context/PreferencesContext'
import { useAuth } from '../context/AuthContext'

export default function UserProfile() {
  const { preferences, updatePreferences } = usePreferences()
  const { user } = useAuth()
  const isId = preferences.language === 'id'

  return (
    <div className="w-full min-h-[calc(100vh-120px)] p-6 md:p-10 rounded-3xl transition-colors duration-300">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-[#222222] dark:text-white">
          {isId ? 'Profil Pengguna' : 'User Profile'}
        </h1>
        <p className="text-lg text-slate-600 dark:text-gray-400">
          {isId ? 'Kelola Profil dan Pengaturan Anda' : 'Manage your Profile and Settings'}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="col-span-1 p-8 rounded-3xl border flex flex-col items-center text-center shadow-sm transition-colors duration-300 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="relative mb-6">
            <img 
              src={user?.profileImage || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=1E6436&color=fff&size=150`} 
              alt="Profile" 
              className="w-36 h-36 rounded-full object-cover border-4 shadow-md border-white dark:border-gray-700"
            />
            <button className="absolute bottom-1 right-1 bg-emerald-600 text-white p-2.5 rounded-full shadow-lg hover:bg-emerald-700 transition-colors active:scale-95">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-1 dark:text-white">{user?.name || 'Guest User'}</h2>
          <p className="text-sm mb-8 text-gray-500 dark:text-gray-400">{user?.email || 'guest@example.com'}</p>
          
          <div className="w-full flex flex-col gap-3">
            <button className="w-full bg-emerald-700 text-white font-semibold px-4 py-3.5 rounded-xl hover:bg-emerald-800 transition-all shadow-sm shadow-emerald-700/20 active:scale-95">
              {isId ? 'Edit Profil' : 'Edit Profile'}
            </button>
            <button className="w-full font-semibold px-4 py-3.5 rounded-xl transition-all shadow-sm active:scale-95 border bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600">
              {isId ? 'Reset Kata Sandi' : 'Reset Password'}
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          <div className="p-8 rounded-3xl border shadow-sm transition-colors duration-300 bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
              <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-lg">
                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              {isId ? 'Preferensi Aplikasi' : 'App Preferences'}
            </h3>
            
            <div className="space-y-6">
              {/* Theme */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-6 border-b border-gray-100 dark:border-gray-700 gap-4">
                <div>
                  <h4 className="font-semibold text-lg">{isId ? 'Tema Tampilan' : 'Theme'}</h4>
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">{isId ? 'Pilih tema untuk seluruh aplikasi' : 'Select theme for the entire app'}</p>
                </div>
                <select
                  className="px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none transition-colors min-w-[150px] font-medium bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={preferences.theme}
                  onChange={(e) => updatePreferences({ theme: e.target.value })}
                >
                  <option value="system">{isId ? 'Ikuti Sistem' : 'System Default'}</option>
                  <option value="light">{isId ? 'Terang' : 'Light'}</option>
                  <option value="dark">{isId ? 'Gelap' : 'Dark'}</option>
                </select>
              </div>

              {/* Language */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-6 border-b border-gray-100 dark:border-gray-700 gap-4">
                <div>
                  <h4 className="font-semibold text-lg">{isId ? 'Bahasa' : 'Language'}</h4>
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">{isId ? 'Pilih bahasa antarmuka' : 'Select interface language'}</p>
                </div>
                <select
                  className="px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-emerald-500 outline-none transition-colors min-w-[150px] font-medium bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={preferences.language}
                  onChange={(e) => updatePreferences({ language: e.target.value })}
                >
                  <option value="id">Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>

              {/* Save History */}
              <div className="flex justify-between items-center pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="pr-4">
                  <h4 className="font-semibold text-lg">{isId ? 'Simpan Riwayat Scan' : 'Save Scan History'}</h4>
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">{isId ? 'Otomatis simpan hasil deteksi tanaman' : 'Automatically save scan results'}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={preferences.saveHistory}
                    onChange={(e) => updatePreferences({ saveHistory: e.target.checked })}
                  />
                  <div className="w-14 h-7 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/50 dark:peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Show Confidence Score */}
              <div className="flex justify-between items-center pb-2">
                <div className="pr-4">
                  <h4 className="font-semibold text-lg">{isId ? 'Tampilkan Skor Kepercayaan' : 'Show Confidence Score'}</h4>
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">{isId ? 'Tampilkan tingkat akurasi pada hasil diagnosis' : 'Display accuracy percentage in diagnoses'}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={preferences.showConfidenceScore}
                    onChange={(e) => updatePreferences({ showConfidenceScore: e.target.checked })}
                  />
                  <div className="w-14 h-7 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/50 dark:peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}