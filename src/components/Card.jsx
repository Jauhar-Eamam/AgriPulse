function Card({ children, className = '', hover = true }) {
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-md p-6 
        ${hover ? 'hover:shadow-lg transition-shadow duration-300' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Card
