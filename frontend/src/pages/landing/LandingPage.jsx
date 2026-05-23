import NavbarPublic from '../../components/navbar/NavbarPublic'
import Footer from '../../components/Footer'
import HeroSection from './sections/HeroSection'
import DifferentSection from './sections/DifferentSection'
import StepsSection from './sections/StepsSection'
import CtaSection from './sections/CtaSection'

export default function LandingPage() {
  return (
    <div className="font-sans text-gray-800">
      <NavbarPublic />
      <HeroSection />
      <DifferentSection />
      <StepsSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
