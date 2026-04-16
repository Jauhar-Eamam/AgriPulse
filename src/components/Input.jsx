function Input({ label, type = 'text', value, onChange, placeholder, required = false }) {
  return (
    <div className="mb-4">
      <label className="block text-green-800 font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 bg-white"
      />
    </div>
  )
}

export default Input
