import { Link, useLocation } from 'react-router-dom'
import { LogoBrand } from '../Logo'

export default function NavbarAuth() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo — kembali ke landing page */}
        <Link to="/">
          <LogoBrand iconSize="w-9 h-9" textSize="text-xl" />
        </Link>

        {/* Dinamis: di /login tampil "Sign Up", di /register tampil "Sign In" */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
          <Link
            to={isLogin ? '/register' : '/login'}
            className="font-semibold text-gray-800 hover:text-[#2a7a53] transition-colors flex items-center gap-1"
          >
            {isLogin ? 'Sign Up →' : 'Sign In →'}
          </Link>
        </div>
      </div>
    </nav>
  )
}