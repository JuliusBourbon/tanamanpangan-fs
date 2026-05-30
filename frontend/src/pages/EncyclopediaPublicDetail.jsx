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
    high:   'bg-yellow-100 text-yellow-700',
    medium: 'bg-blue-100 text-blue-700',
    low:    'bg-green-100 text-green-700',
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
  return <div>proses pengerjaan</div>
}