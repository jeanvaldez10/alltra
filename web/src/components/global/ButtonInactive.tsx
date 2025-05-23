import React from 'react'

const ButtonInactive: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className="hover:bg-neutral-900 cursor-pointer gap-3 justify-center flex items-center bg-neutral-900/60 text-neutral-500 p-3 rounded-2xl">
        {children}
    </div>
  )
}

export default ButtonInactive