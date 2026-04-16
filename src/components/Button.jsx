function Button({ children, onClick, variant = 'primary', disabled = false, className = '' }) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg',
    secondary: 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50',
    outline: 'bg-transparent text-green-700 border border-green-300 hover:bg-green-100'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
