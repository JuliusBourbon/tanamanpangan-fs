import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

// Public pages
import LandingPage from './pages/LandingPage'

// Auth pages
import Login from './pages/Login'
import Register from './pages/Register'

// Protected pages
import Dashboard from './pages/Dashboard'

// PublicOnlyRoute — redirect ke /dashboard kalau sudah login
function PublicOnlyRoute({ children }) {
  const { user, isLoadingAuth } = useAuth()

  if (isLoadingAuth) return null // Tunggu verifikasi token selesai
  if (user) return <Navigate to="/dashboard" replace /> // sudah login → langsung ke dashboard

  return children
}

// AppRoutes dipisah dari App supaya bisa akses useAuth()
function AppRoutes() {
  <Routes>
    {/* ── Public routes ── */}
    <Route 
      path="/"
      element={
        <PublicOnlyRoute>
          <LandingPage />
        </PublicOnlyRoute>
      }
    />

    {/* ── Auth routes (hanya bisa diakses kalau belum login) ── */}
    <Route
      path="/login"
      element={
        <PublicOnlyRoute>
          <Login />
        </PublicOnlyRoute>
      }
    />
    <Route
      path="/register"
      element={
        <PublicOnlyRoute>
          <Register />
        </PublicOnlyRoute>
      }
    />

    {/* /reset-password?token=xxx — token dibaca via useSearchParams di dalam page */}


    {/* ── Onboarding — protected, tapi terpisah dari layout dashboard ── */}


    {/* ── Protected routes ── */}
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />

    {/* /scan/result/:id — id dari classificationId response API */}


    {/* ── Fallback — semua route tidak dikenal ── */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}