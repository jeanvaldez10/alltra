import React from 'react'

const Container: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return (
    <div className=' w-full h-[calc(100vh-64px)]'>
        {children}
    </div>
  )
}

export default Container