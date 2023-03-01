import React from 'react'

function Container({ children }) {
  return (
    <div className="container max-w-[1200px] mx-auto px-5 flex items-center justify-center bg-purple-900">
      {children}
    </div>
  )
}

export default Container