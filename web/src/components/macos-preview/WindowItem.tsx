import React from 'react'

const WindowItem: React.FC<{children?: React.ReactNode}> = ({children}) => {
  return (
    <div className="h-[calc(100%-120px)] flex items-center px-4">

    <div className=" h-[calc(100%-50px)] my-auto w-full max-w-[1090px] mx-auto   bg-black/80 border border-zinc-900 backdrop-blur-2xl  rounded-lg shadow-2xl shadow-neutral-950/50">
        {/* Window Tab */}
        <div className=" border-b border-zinc-900 w-full h-7 rounded-t-xl flex items-center px-2.5">
            <div className="flex gap-2">
                <div className="w-[12px] h-[12px] rounded-full bg-red-600 duration-100 hover:bg-red-700 cursor-pointer"></div>
                <div className="w-[12px] h-[12px] rounded-full bg-yellow-600 duration-100 hover:bg-yellow-700 cursor-pointer"></div>
                <div className="w-[12px] h-[12px] rounded-full bg-green-600 duration-100 hover:bg-green-700 cursor-pointer"></div>
            </div>
        </div>
        <div>
        </div>
        <div>
            {children}
        </div>
    </div>
    <div>

    </div>

</div>
  )
}

export default WindowItem