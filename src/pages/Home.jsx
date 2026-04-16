import { Link } from 'react-router-dom'
import { Cloud, TrendingUp, Warehouse, FileText, Cpu, ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import Footer from '../components/Footer'

function Home({ t }) {
  const modules = [
    { 
      icon: Cloud, 
      title: t.climateTitle, 
      desc: t.climateDesc, 
      active: true,
      path: '/climate'
    },
    { 
      icon: TrendingUp, 
      title: t.marketTitle, 
      desc: t.marketDesc, 
      active: false,
      path: '#'
    },
    { 
      icon: Warehouse, 
      title: t.storageTitle, 
      desc: t.storageDesc, 
      active: false,
      path: '#'
    },
    { 
      icon: FileText, 
      title: t.schemesTitle, 
      desc: t.schemesDesc, 
      active: false,
      path: '#'
    },
    { 
      icon: Cpu, 
      title: t.techTitle, 
      desc: t.techDesc, 
      active: false,
      path: '#'
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-white text-green-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/climate">
                <Button className="bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto">
                  {t.getStarted}
                  <ArrowRight className="inline ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50 w-full sm:w-auto">
                {t.learnMore}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">
              {t.aboutTitle}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t.aboutText}
            </p>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-12">
            {t.modulesTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Link 
                key={index}
                to={module.active ? module.path : '#'}
                onClick={(e) => !module.active && e.preventDefault()}
                className={!module.active ? 'cursor-not-allowed' : ''}
              >
                <Card className={`h-full ${!module.active ? 'opacity-60' : 'hover:-translate-y-1 transition-transform duration-300'}`}>
                  <div className="flex flex-col h-full">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${module.active ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <module.icon className={`h-7 w-7 ${module.active ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      {module.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {module.desc}
                    </p>
                    <div className="mt-auto">
                      <span className={`
                        inline-block px-3 py-1 rounded-full text-sm font-medium
                        ${module.active 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-600'
                        }
                      `}>
                        {module.active ? t.active : t.comingSoon}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer t={t} />
    </div>
  )
}

export default Home
