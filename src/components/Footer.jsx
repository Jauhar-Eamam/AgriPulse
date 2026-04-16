import { Leaf } from 'lucide-react'

function Footer({ t }) {
  return (
    <footer className="bg-green-800 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            <span className="font-semibold">Agritech Solutions</span>
          </div>
          <p className="text-green-200 text-sm text-center">
            {t.footerText}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
