import NavbarPublic from '../components/navbar/NavbarPublic'
import Footer from '../components/Footer'
import CtaSection from './landing/sections/CtaSection'
import { TEXT } from '../constants/text'

const { howItWorks: T } = TEXT

export default function HowItWorks() {
  return (
    <div className="font-sans text-gray-800">
        <NavbarPublic />

        {/* Hero section */}
        <section className="pt-28 pb-5 px-6 bg-gray-50 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {T.heading}
            </h1>
            <p className="text-gray-500 leading-relaxed">
              {T.subheading}
            </p>
          </div>
        </section>

        {/* Steps grid */}
        <section className="py-8 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {T.steps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl border border-gray-200 p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 text-sm font-semibold flex-shrink-0">
                    {step.num}
                  </div>
                  <h2 className="font-bold text-gray-800 text-lg">{step.title}</h2>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <CtaSection />
        <Footer />
    </div>
  )
}
