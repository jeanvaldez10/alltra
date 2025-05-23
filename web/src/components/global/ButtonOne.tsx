import React from 'react'

const ButtonOne: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <button className=' px-4 py-2 border-neutral-800 border bg-gradient-to-br from-neutral-800 to-neutral-950'>

        {children}
    </button>
  )
}

export default ButtonOne