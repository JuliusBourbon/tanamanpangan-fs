import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarPublic from '../components/navbar/NavbarPublic'
import OnboardingModal from '../components/onboarding/OnboardingModal'
import { hasCompletedOnboarding } from '../utils/onboarding'

export default function Onboarding() {
  const navigate = useNavigate()

  // Jika user sudah pernah onboarding, skip langsung ke dashboard
  useEffect(() => {
    if (hasCompletedOnboarding()) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background — sama dengan hero section Landing Page */}
      <img
        src="src/assets/lp-bg_section1.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Overlay gelap 25% sesuai Figma */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Navbar Landing Page di atas background */}
      <div className="relative z-10">
        <NavbarPublic />
      </div>

      {/* Modal onboarding */}
      <OnboardingModal />
    </div>
  )
}