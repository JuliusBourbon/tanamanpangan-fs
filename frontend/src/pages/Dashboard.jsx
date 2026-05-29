import { useAuth } from '../context/AuthContext'
import { usePreferences } from '../context/PreferencesContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Dashboard() {
  const { preferences } = usePreferences()
  const isId = preferences.language === 'id'
  const { user } = useAuth();

  const navigate = useNavigate();
  
  // State untuk menyimpan data API
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data dari backend
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        // Sesuaikan URL endpoint dengan route backend Anda
        const response = await api.get('/api/dashboard'); 
        setDashboardData(response.data.data);
      } catch (err) {
        console.error('Error fetching dashboard:', err);
        setError(isId ? 'Gagal memuat data dashboard.' : 'Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-bold tracking-tight mb-2 text-gray-900 dark:text-gray-200">Dashboard</h1>
          <p className="text-slate-600 dark:text-gray-300">{isId ? 'Ringkasan aktivitas pemindaian Anda' : 'Summary of your scan activity'}</p>
        </div>
        <div className="text-right">
          <p className="text-xl text-slate-500">
            Afternoon, <span className="font-bold text-gray-900 dark:text-gray-200">{user?.name}</span>
          </p>
          <button 
            onClick={() => navigate('/scan')}
            className="mt-4 bg-[#1E6436] text-white px-4 py-2 rounded text-sm hover:bg-green-800 transition-colors"
          >
            + {isId ? 'Scan Baru' : 'New Scan'}
          </button>
        </div>
      </header>
      <main>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1E6436]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-xl text-center">
            {error}
          </div>
        ) : dashboardData && (
          <div className="space-y-8 animate-fade-in">
            {/* Baris Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-slate-500 dark:text-gray-400 text-sm font-medium mb-2">{isId ? 'Total Scan' : 'Total Scans'}</h3>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">{dashboardData.totalScans}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-slate-500 dark:text-gray-400 text-sm font-medium mb-2">{isId ? 'Scan Bulan Ini' : 'Scans This Month'}</h3>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">{dashboardData.scansThisMonth}</p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
                <h3 className="text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-2">{isId ? 'Tanaman Sehat' : 'Healthy Crops'}</h3>
                <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-500">{dashboardData.healthyPercentage}%</p>
              </div>
            </div>

            {/* Bagian Scan Terakhir */}
            {dashboardData.lastScan && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">{isId ? 'Hasil Deteksi Terakhir' : 'Last Detection Result'}</h2>
                <div className="flex gap-5 items-center">
                  <img 
                    src={dashboardData.lastScan.imageUrl || 'https://placehold.co/400x400?text=No+Image'} 
                    alt="Last scan" 
                    className="w-24 h-24 object-cover rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600" 
                  />
                  <div>
                    <p className="font-bold text-xl text-gray-900 dark:text-white">
                      {dashboardData.lastScan.disease?.name || (isId ? 'Tidak Teridentifikasi' : 'Unidentified')}
                    </p>
                    <p className="text-slate-500 dark:text-gray-400 capitalize mt-1">
                      {isId ? 'Tanaman: ' : 'Crop: '} {dashboardData.lastScan.disease?.cropType}
                    </p>
                    
                    {preferences.showConfidenceScore && (
                      <div className="inline-flex items-center gap-1.5 mt-3 bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-1 rounded-md">
                        <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                          {isId ? 'Akurasi: ' : 'Accuracy: '} 
                          {(dashboardData.lastScan.confidenceScore * 100).toFixed(0)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {dashboardData.recentHistory && dashboardData.recentHistory.length > 0 && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {isId ? 'Riwayat Deteksi Terbaru' : 'Recent Detection History'}
                  </h2>
                  <button
                    onClick={() => navigate('/history')}
                    className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                  >
                    {isId ? 'Lihat Semua' : 'View All'}
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {dashboardData.recentHistory.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => navigate(`/history/${item.id}`)}
                      className="flex items-center gap-4 p-3 rounded-xl border border-gray-50 dark:border-gray-700 hover:border-emerald-100 dark:hover:border-emerald-900/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all cursor-pointer group"
                    >
                      <img 
                        src={item.imageUrl || 'https://placehold.co/400x400?text=No+Image'} 
                        alt={item.disease?.name || 'Scan result'} 
                        className="w-14 h-14 object-cover rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                      />
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                          {item.disease?.name || (isId ? 'Tidak Teridentifikasi' : 'Unidentified')}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-gray-400">
                          <span className="capitalize">{item.disease?.cropType}</span>
                          <span>•</span>
                          <span>
                            {new Date(item.createdAt).toLocaleDateString(isId ? 'id-ID' : 'en-US', { 
                              day: 'numeric', month: 'short', year: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Mengikuti preferensi skor kepercayaan */}
                      {preferences.showConfidenceScore && (
                        <div className="pl-4">
                          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-500">
                            {(item.confidenceScore * 100).toFixed(0)}%
                          </span>
                        </div>
                      )}
                      
                      {/* Ikon panah ke kanan untuk indikasi bisa diklik */}
                      <div className="text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 transition-colors ml-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}