import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoIcon } from '../Logo'
import { TEXT } from '../../constants/text'
import { completeOnboarding } from '../../utils/onboarding'

const { onboarding: { steps } } = TEXT

function StepIcon({ type }) {
  const base = 'w-[120px] h-[120px] rounded-2xl bg-[#2a7a53] flex items-center justify-center mx-auto mb-6'

  if (type === 'logo') {
    return (
      <div className={base}>
        <LogoIcon className="w-16 h-16" />
      </div>
    )
  }

  if (type === 'photo') {
    return (
      <div className={base}>
        <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 8V5M12 5l-2 2M12 5l2 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }

  if (type === 'ai') {
    return (
      <div className={base}>
        <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" strokeLinejoin="round" />
          <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }

  if (type === 'result') {
    return (
      <div className={base}>
        <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="4" y="3" width="13" height="16" rx="2" />
          <rect x="7" y="6" width="7" height="9" rx="1" />
          <path d="M9 10l1.5 1.5 2.5-2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }

  return null
}

function DotIndicators({ current, total }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === current ? 'w-3 h-3 bg-gray-600' : 'w-3 h-3 bg-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

export default function OnboardingModal() {
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()
  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1

  const finish = () => {
    completeOnboarding()
    navigate('/dashboard', { replace: true })
  }

  const handleNext = () => {
    if (isLast) {
      finish()
    } else {
      setCurrentStep((s) => s + 1)
    }
  }

  const handlePrev = () => setCurrentStep((s) => s - 1)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md px-10 py-10 relative">
        <button
          onClick={finish}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close onboarding"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        <StepIcon type={step.icon} />

        <h2 className="text-xl font-bold text-gray-800 text-center mb-3">{step.title}</h2>
        <p className="text-gray-500 text-sm text-center leading-relaxed whitespace-pre-line mb-6">
          {step.desc}
        </p>

        <button
          onClick={handleNext}
          className="w-full bg-[#2a7a53] hover:bg-[#235f40] text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {step.nextBtn}
        </button>

        <div className="mt-3 text-center h-6">
          {currentStep === 0 && (
            <button
              onClick={finish}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              {step.skipBtn}
            </button>
          )}
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              {step.prevBtn}
            </button>
          )}
        </div>

        <DotIndicators current={currentStep} total={steps.length} />
      </div>
    </div>
  )
}
