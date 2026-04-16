import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Climate from './pages/Climate'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { translations } from './data/translations'

function App() {
  const [language, setLanguage] = useState('en')
  const t = translations[language]
  const location = useLocation()

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  // Hide navbar on auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <AuthProvider>
      <div className="min-h-screen bg-green-50">
        {!isAuthPage && <Navbar t={t} language={language} toggleLanguage={toggleLanguage} />}
        <main>
          <Routes>
            <Route path="/" element={<Home t={t} />} />
            <Route path="/climate" element={<Climate t={t} />} />
            <Route path="/login" element={<Login t={t} />} />
            <Route path="/signup" element={<Signup t={t} />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App
