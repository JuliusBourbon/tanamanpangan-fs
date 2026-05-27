import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function ScanHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/api/classify/history');
        setHistory(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load history. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-bold tracking-tight mb-2 text-[#222222]">History</h1>
          <p className="text-slate-600">Review and manage your plant diseases diagnoses</p>
        </div>
      </header>

      <main className="w-full flex-1">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-t-2 border-[#1E6436]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg border border-red-100 flex items-center gap-3">
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p>{error}</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
            <p className="text-gray-500 mb-4 text-lg">You haven't made any scans yet.</p>
            <Link to="/scan" className="bg-[#1E6436] text-white px-6 py-2.5 rounded-md hover:bg-green-800 transition-colors font-medium">
              Start your first scan
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
            {history.map((item) => (
              <Link 
                key={item.id} 
                to={`/history/${item.id}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
              >
                <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.disease.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-[#1E6436] shadow-sm">
                    {(item.confidenceScore * 100).toFixed(0)}% Match
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">{item.disease.cropType}</span>
                    <span className="text-[11px] text-gray-400 font-medium">{formatDate(item.createdAt)}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1 leading-tight line-clamp-1" title={item.disease.name}>{item.disease.name}</h3>
                  <p className="text-sm text-gray-500 italic mb-3 line-clamp-1">{item.disease.scientificName}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}