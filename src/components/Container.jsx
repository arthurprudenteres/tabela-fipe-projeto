import React from 'react'

function Container({ children }) {
  return (
    <div className="container max-w-[1200px] h-full mx-auto px-5 flex items-center justify-center">
      {children}
    </div>
  )
}

export default Container