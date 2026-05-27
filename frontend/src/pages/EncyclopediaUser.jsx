import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function EncyclopediaUser() {
  const [diseases, setDiseases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await api.get('/api/diseases/');
        setDiseases(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load encyclopedia data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiseases();
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-bold tracking-tight mb-2 text-[#222222]">Encyclopedia</h1>
          <p className="text-slate-600">Comprehensive database of plant diseases, pests, and deficiencies</p>
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
            {diseases.map((disease) => (
              <Link 
                key={disease.id} 
                to={`/encyclopedia-app/:${disease.slug}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#1E6436]/40 transition-all group flex flex-col p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-md">
                    {disease.cropType}
                  </span>
                  {disease.severity && (
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${getSeverityColor(disease.severity)}`}>
                      {disease.severity}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-1 group-hover:text-[#1E6436] transition-colors line-clamp-2">{disease.name}</h3>
                <p className="text-sm text-gray-500 italic mb-4">{disease.scientificName || 'Unknown'}</p>
                <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1 leading-relaxed">{disease.description}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-[#1E6436] text-sm font-semibold">
                  <span>View Details</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}