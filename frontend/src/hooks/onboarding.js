import { useRef, useState } from 'react'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { hasCompletedOnboarding, completeOnboarding } from '../utils/onboarding'

export const useOnboarding = () => {
  const [showWelcome, setShowWelcome] = useState(!hasCompletedOnboarding())
  const driverRef = useRef(null)

  const startSidebarTour = () => {
    driverRef.current = driver({
      animate: true,
      showProgress: true,
      progressText: '{{current}} / {{total}}',
      nextBtnText: 'Lanjut →',
      prevBtnText: '← Kembali',
      doneBtnText: 'Mulai!',
      onDestroyStarted: () => {
        completeOnboarding()
        driverRef.current?.destroy()
      },
      steps: [
        {
          element: '#sidebar-logo',
          popover: {
            title: 'Selamat datang di Tanam Pangan! 🌱',
            description: 'Aplikasi ini membantu kamu mengelola data pangan dengan mudah.',
            side: 'right',
            align: 'start',
          },
        },
        {
          element: '#sidebar-nav',
          popover: {
            title: 'Menu navigasi',
            description: 'Gunakan menu ini untuk berpindah antar halaman. Kamu juga bisa pakai shortcut keyboard yang tertera.',
            side: 'right',
            align: 'start',
          },
        },
        {
          element: '#sidebar-toggle',
          popover: {
            title: 'Perkecil sidebar',
            description: 'Klik tombol ini untuk memperluas atau memperkecil sidebar sesuai kebutuhan.',
            side: 'right',
            align: 'start',
          },
        },
      ],
    })

    setTimeout(() => driverRef.current?.drive(), 300)
  }

  const finishWelcome = () => {
    setShowWelcome(false)
    startSidebarTour()
  }

  return { showWelcome, finishWelcome }
}