import { useState } from 'react'
import { Cloud, Thermometer, Droplets, Sprout, CheckCircle, AlertCircle } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import Loader from '../components/Loader'
import Footer from '../components/Footer'
import { climateResults } from '../data/climateData'

function Climate({ t }) {
  const [formData, setFormData] = useState({
    location: '',
    temperature: '',
    rainfall: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    setError('')
  }

  const handleAnalyze = () => {
    if (!formData.location.trim()) {
      setError(t.locationRequired)
      return
    }

    setIsLoading(true)
    setResult(null)
    setError('')

    // Simulate API call with dummy data
    setTimeout(() => {
      const language = t.home === 'Home' ? 'en' : 'hi'
      const randomIndex = Math.floor(Math.random() * climateResults[language].length)
      setResult(climateResults[language][randomIndex])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <Cloud className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t.climatePageTitle}
          </h1>
          <p className="text-green-100 max-w-2xl mx-auto">
            {t.climatePageSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Input Form */}
          <Card className="mb-8">
            <h2 className="text-xl font-semibold text-green-800 mb-6 flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              {t.climatePageTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Input
                label={t.location}
                value={formData.location}
                onChange={handleChange('location')}
                placeholder={t.locationPlaceholder}
                required
              />
              <Input
                label={t.temperature}
                type="number"
                value={formData.temperature}
                onChange={handleChange('temperature')}
                placeholder={t.temperaturePlaceholder}
              />
              <Input
                label={t.rainfall}
                type="number"
                value={formData.rainfall}
                onChange={handleChange('rainfall')}
                placeholder={t.rainfallPlaceholder}
              />
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? t.analyzing : t.analyzeClimate}
            </Button>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <Card>
              <Loader />
              <p className="text-center text-gray-600 mt-4">{t.analyzing}</p>
            </Card>
          )}

          {/* Results */}
          {result && !isLoading && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                {t.resultsTitle}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Predicted Condition */}
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Cloud className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{t.predictedCondition}</h3>
                      <p className="text-green-700 font-medium">{result.condition}</p>
                    </div>
                  </div>
                </Card>

                {/* Seasonal Trend */}
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Thermometer className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{t.seasonalTrend}</h3>
                      <p className="text-gray-600">{result.trend}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Farming Suggestion */}
              <Card className="bg-green-50 border border-green-200">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Sprout className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800 mb-2">{t.farmingSuggestion}</h3>
                    <p className="text-gray-700">{result.suggestion}</p>
                  </div>
                </div>
              </Card>

              {/* Recommended Crops */}
              <Card>
                <h3 className="font-semibold text-green-800 mb-4">{t.recommendedCrops}</h3>
                <div className="flex flex-wrap gap-2">
                  {result.crops.map((crop, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Best Practices */}
              <Card>
                <h3 className="font-semibold text-green-800 mb-4">{t.bestPractices}</h3>
                <ul className="space-y-3">
                  {result.practices.map((practice, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{practice}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer t={t} />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Climate
