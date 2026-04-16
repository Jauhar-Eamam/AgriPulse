function Loader() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-green-200 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
      </div>
    </div>
  )
}

export default Loader
