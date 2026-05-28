import { useEffect, useRef } from 'react'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { hasCompletedOnboarding, completeOnboarding } from '../utils/onboarding'

export const useOnboarding = () => {
  const driverRef = useRef(null)

  useEffect(() => {
    if (hasCompletedOnboarding()) return

    driverRef.current = driver({
      animate: true,
      smoothScroll: true,
      showProgress: true,
      progressText: '{{current}} / {{total}}',
      nextBtnText: 'Lanjut →',
      prevBtnText: '← Kembali',
      doneBtnText: 'Mulai!',
      onDestroyStarted: () => {
        // Dipanggil saat user klik X atau selesai
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

    // Sedikit delay agar DOM sudah siap sebelum driver berjalan
    const timer = setTimeout(() => {
      driverRef.current?.drive()
    }, 500)

    return () => clearTimeout(timer)
  }, [])
}