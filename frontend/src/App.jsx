import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

// Public pages
import LandingPage from './pages/landing/LandingPage'
import HowItWorks from './pages/HowItWorks'
import AboutUs from './pages/AboutUs'
import TermsOfService from './pages/TermsOfService'
import EncyclopediaPublic from './pages/EncyclopediaPublic'
import EncyclopediaPublicDetail from './pages/EncyclopediaPublicDetail'

// Auth pages
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

// Onboarding (setelah register, sebelum dashboard)
import Onboarding from './pages/Onboarding'

// Protected pages
import Dashboard from './pages/Dashboard'
import ScanPage from './pages/ScanPage'
import ScanResult from './pages/ScanResult'
import ScanHistory from './pages/ScanHistory'
import EncyclopediaUser from './pages/EncyclopediaUser'
import EncyclopediaUserDetail from './pages/EncyclopediaUserDetail'
import UserProfile from './pages/UserProfile'

// PublicOnlyRoute — redirect ke /dashboard kalau sudah login
function PublicOnlyRoute({ children }) {
  const { user, isLoadingAuth } = useAuth()

  if (isLoadingAuth) return null // Tunggu verifikasi token selesai
  if (user) return <Navigate to="/dashboard" replace /> // sudah login → langsung ke dashboard

  return children
}

// AppRoutes dipisah dari App supaya bisa akses useAuth()
function AppRoutes() {
  return(
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
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/encyclopedia" element={<EncyclopediaPublic />} />
      <Route path="/encyclopedia/:slug" element={<EncyclopediaPublicDetail />} />

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
      <Route
        path="/forgot-password"
        element={
          <PublicOnlyRoute>
            <ForgotPassword />
          </PublicOnlyRoute>
        }
      />

      {/* /reset-password?token=xxx — token dibaca via useSearchParams di dalam page */}
      <Route
        path="/reset-password"
        element={
          <PublicOnlyRoute>
            <ResetPassword />
          </PublicOnlyRoute>
        }
      />

      {/* ── Onboarding — protected, tapi terpisah dari layout dashboard ── */}
      <Route
        path="/onboarding"
        element={
          <PrivateRoute>
            <Onboarding />
          </PrivateRoute>
        }
      />

      {/* ── Protected routes ── */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/scan"
        element={
          <PrivateRoute>
            <ScanPage />
          </PrivateRoute>
        }
      />

      {/* /scan/result/:id — id dari classificationId response API */}
      <Route
        path="/scan/result/:id"
        element={
          <PrivateRoute>
            <ScanResult />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <ScanHistory />
          </PrivateRoute>
        }
      />
      <Route
        path="/history/:id"
        element={
          <PrivateRoute>
            <ScanResult />
          </PrivateRoute>
        }
      />
      <Route
        path="/encyclopedia-app"
        element={
          <PrivateRoute>
            <EncyclopediaUser />
          </PrivateRoute>
        }
      />
      <Route
        path="/encyclopedia-app/:slug"
        element={
          <PrivateRoute>
            <EncyclopediaUserDetail />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />

      {/* ── Fallback — semua route tidak dikenal ── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
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