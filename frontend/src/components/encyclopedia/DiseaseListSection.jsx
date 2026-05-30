import { Link } from 'react-router-dom'
import { TEXT } from '../../constants/text'

const T = TEXT.encyclopedia

// Badge severity — warna sesuai level
function SeverityBadge({ severity }) {
  const styles = {
    high:   'bg-yellow-100 text-yellow-700',
    medium: 'bg-blue-100 text-blue-700',
    low:    'bg-green-100 text-green-700',
  }
  const label = T.severity[severity] ?? severity
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${styles[severity] ?? 'bg-gray-100 text-gray-600'}`}>
      {label}
    </span>
  )
}

// path bisa /encyclopedia/:slug (public) atau /encyclopedia-app/:slug (user)
export default function DiseaseCard({ disease, basePath = '/encyclopedia' }) {
  return (
      <div>proses pengerjaan</div>
  )
}
