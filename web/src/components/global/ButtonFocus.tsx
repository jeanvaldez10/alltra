import React from 'react'

const ButtonFocus: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className=" justify-center flex items-center bg-gradient-to-tl from-neutral-800 from-50% to-neutral-700 p-3 rounded-2xl border-t border-neutral-600 shadow-inner shadow-neutral-700">
          <div className="[&>*]:text-white"> {children}</div>
        </div>
  )
}

export default ButtonFocus