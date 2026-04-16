import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Leaf, Globe, User, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Navbar({ t, language, toggleLanguage }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const navItems = [
    { path: '/', label: t.home, active: true },
    { path: '/climate', label: t.climate, active: true },
    { path: '#', label: t.market, active: false },
    { path: '#', label: t.storage, active: false },
    { path: '#', label: t.schemes, active: false },
    { path: '#', label: t.technology, active: false },
  ]

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-green-700">Agritech Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.active ? item.path : '#'}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300
                  ${location.pathname === item.path ? 'text-green-700 bg-green-100' : 'text-gray-600 hover:text-green-600'}
                  ${!item.active ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                onClick={(e) => !item.active && e.preventDefault()}
              >
                {item.label}
                {!item.active && <span className="ml-1 text-xs text-orange-500"></span>}
              </Link>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-300"
            >
              <Globe className="h-4 w-4" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-300"
                >
                  <User className="h-4 w-4" />
                  {user?.name?.split(' ')[0]}
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      {t.logout || 'Logout'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
                >
                  {t.login || 'Login'}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {t.signup || 'Sign Up'}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-green-100 text-green-700"
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-green-600 hover:bg-green-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-green-100">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.active ? item.path : '#'}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${location.pathname === item.path ? 'text-green-700 bg-green-100' : 'text-gray-600'}
                  ${!item.active ? 'opacity-50' : ''}
                `}
                onClick={(e) => {
                  if (!item.active) e.preventDefault()
                  else setIsOpen(false)
                }}
              >
                {item.label}
                {!item.active && <span className="ml-2 text-xs text-orange-500">({t.comingSoon})</span>}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="pt-3 border-t border-gray-100">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-red-600 rounded-md hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    {t.logout || 'Logout'}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-center text-green-700 border border-green-600 rounded-lg"
                  >
                    {t.login || 'Login'}
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-center bg-green-600 text-white rounded-lg"
                  >
                    {t.signup || 'Sign Up'}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
