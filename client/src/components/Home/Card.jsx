import React from 'react'

const Card = ({ children }) => {
  return (
    <div className="p-8 rounded-xl shadow-2xl">
      {children}
    </div>
  )
}

export default Card