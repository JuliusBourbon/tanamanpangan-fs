import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import NavbarPublic from '../components/navbar/NavbarPublic'
import Footer from '../components/Footer'
import api from '../api/axios'
import { TEXT } from '../constants/text'

const T = TEXT.encyclopedia

// Badge severity
function SeverityBadge({ severity }) {
  const styles = {
    high:   'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400', 
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    low:    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
  }
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${styles[severity] ?? 'bg-gray-100 text-gray-600'}`}>
      {T.severity[severity] ?? severity}
    </span>
  )
}

// Info card — reusable untuk tiap section detail
function InfoCard({ icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{icon}</span>
        <h3 className="font-bold text-gray-800">{title}</h3>
      </div>
      {children}
    </div>
  )
}

// Render teks yang mungkin berisi list (dipisah newline atau bullet)
function TextContent({ text }) {
  if (!text) return <p className="text-gray-500 text-sm">-</p>
  const lines = text.split('\n').filter(Boolean)
  if (lines.length <= 1) {
    return <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
  }
  return (
    <ul className="flex flex-col gap-1.5">
      {lines.map((line, i) => (
        <li key={i} className="flex items-start gap-2 text-gray-500 text-sm leading-relaxed">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
          {line.replace(/^[-•]\s*/, '')}
        </li>
      ))}
    </ul>
  )
}

export default function EncyclopediaPublicDetail() {
  const { slug } = useParams()
  const [disease, setDisease] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const res = await api.get(`/api/diseases/${slug}`)
        setDisease(res.data.data)
      } catch {
        setError('Disease not found.')
      } finally {
        setLoading(false)
      }
    }
    fetchDisease()
  }, [slug])

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <NavbarPublic />

      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#2a7a53] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="text-center text-red-500 text-sm py-16">{error}</p>
        )}

        {!loading && !error && disease && (
          <>
            {/* Back link */}
            <Link
              to="/encyclopedia"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#2a7a53] transition-colors mb-6"
            >
              {T.backBtn}
            </Link>

            {/* Judul + badge */}
            <h1 className="text-3xl font-bold text-[#2a7a53] mb-2">{disease.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              {disease.severity } <div>proses pengerjaan</div>
              <span className="text-gray-400 text-sm italic">{disease.scientificName}</span>
            </div>


            {/* Gambar utama */}
            {disease.imageUrl && (
              <div className="w-full h-72 rounded-2xl overflow-hidden mb-8 bg-gray-100">
                <img
                  src={disease.imageUrl}
                  alt={disease.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Grid 6 info card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* 1. Overview */}
              <InfoCard icon="ℹ️" title={T.detailSections.overview}>
                <div>proses pengerjaan</div>
              </InfoCard>

              {/* 2. Symptoms */}
              <InfoCard icon="📋" title={T.detailSections.symptoms}>
                <div>proses pengerjaan</div>
              </InfoCard>

              {/* 3. Treatment */}
              <InfoCard icon="🧪" title={T.detailSections.treatment}>
                <div>proses pengerjaan</div>
              </InfoCard>

              {/* 4. Causes & Conditions */}
              <InfoCard icon="🔬" title={T.detailSections.causes}>
                <div>proses pengerjaan</div>
              </InfoCard>

              {/* 5. Prevention */}
              <InfoCard icon="🛡️" title={T.detailSections.prevention}>
                <div>proses pengerjaan</div>
              </InfoCard>

              {/* 6. Source — placeholder sampai API siap */}
              <InfoCard icon="🌐" title={T.detailSections.source}>
                <p className="text-gray-400 text-sm italic">{T.detailSections.sourceNote}</p>
                  {/* TODO: ganti baris di atas dengan ini saat API sudah ada field source: <TextContent text={disease.source} /> */}
                  <div>proses pengerjaan</div>
              </InfoCard>
            </div>

            {/* Total detections */}
            {disease.totalDetections !== undefined && (
                <p className="text-center text-gray-400 text-sm mt-10">
                  {T.detailSections.totalDetections} : <span className="font-semibold text-gray-600">{disease.totalDetections}</span>
                </p>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}