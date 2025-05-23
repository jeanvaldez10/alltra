import React from 'react'

const FeaturesSection = () => {
    return (
        <div className='max-w-5xl mx-auto mt-64 '>

            <div className=' '>

            </div>

            <div className='w-max mx-auto'>

                <div className='flex  relative right-16'>
                    <div className='h-16 w-16  border-t relative left-3 border-l rounded-tl-lg'>
                        <div className='rounded-full bg-neutral-200 border  size-1 relative top-[62px] right-[2px]'></div>
                    </div>
                    <div className='w-32 h-16 border-r flex border-t rounded-tr-lg relative left-3'>
                        <div className=' flex flex-col h-6 w-px bg-neutral-800 mt-auto relative left-[37px]'>

                            <div className=''></div><div className='rounded-full bg-neutral-200 border  size-1 relative bottom-px right-px'></div>
                        </div>
                        <div className='flex flex-col h-9 w-px bg-neutral-800 mt-auto relative left-[81px]'>
                            <div className=''></div><div className='rounded-full bg-neutral-200 border  size-1 relative bottom-px right-px'></div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col max-w-max'>
                    <div className='grid grid-cols-6 px-4'>
                        {[...Array(6)].map((i, index) => {
                            if (index == 1 || index == 3 || index == 5) {
                                return <div key={index} className='w-full flex justify-center '>
                                    <div className='w-1.5 h-4 rounded-t-[1px] bg-gradient-to-t from-neutral-400 to-30% via-neutral-500 via-20% to-neutral-500 border-t-[0.5px] border-neutral-400 '></div>
                                </div>
                            }
                            return <div key={index} className='w-full flex justify-center mt-auto'>
                                <div className='w-1.5 h-2 rounded-t-[1px] bg-gradient-to-t from-neutral-400 to-30% via-neutral-500 via-20% to-neutral-500 border-t-[0.5px] border-neutral-400 '></div>
                            </div>
                        })}
                        <div>

                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex flex-col items-start justify-around mt-2'>
                            {[...Array(2)].map((i, index) => {
                                if (index == 1) {
                                    return <div key={index} className='w-full flex justify-center'>
                                        <div className='w-4 h-1.5 rounded-l-[1px] bg-gradient-to-l from-neutral-400 to-30% via-neutral-500 via-20% to-neutral-500 border-l-[0.5px] border-neutral-400 '></div>
                                    </div>
                                }
                                return <div key={index} className='w-full flex justify-center relative left-1'>
                                    <div className='w-2 h-1.5 rounded-l-[1px] bg-gradient-to-l from-neutral-400 to-30% via-neutral-500 via-20% to-neutral-500 border-l-[0.5px] border-neutral-400 '></div>
                                </div>

                            })}
                            <div>

                            </div>
                        </div>
                        <div className='bg-gradient-to-br from-neutral-800  to-neutral-900  py-2.5 px-4 rounded-lg border-[3px] border-neutral-800/60'>
                            <h1 className='text-2xl select-none  text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500 font-bold text-sans '>MayTrade</h1>
                        </div>
                        <div className='flex flex-col justify-around  mt-2'>
                            {[...Array(2)].map((i, index) => {
                                return <div key={index} className='w-full flex justify-center'>
                                    <div className='w-2 h-1.5 rounded-r-[1px] bg-gradient-to-r from-neutral-400 to-30% via-neutral-500 via-20% to-neutral-500 border-r-[0.5px] border-neutral-400 '></div>
                                </div>
                            })}
                            <div>

                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-6 px-4'>
                        {[...Array(6)].map((i, index) => {
                            if (index == 1 || index == 3 || index == 5) {
                                return <div key={index} className='w-full flex justify-center'>
                                    <div className='h-4 w-1.5 rounded-b-[1px] bg-gradient-to-b from-neutral-400 to-30% via-neutral-500 via-20% to-neutral-500 border-b-[0.5px] border-neutral-400 '></div>
                                </div>
                            }
                            return <div key={index} className='w-full flex justify-center mb-auto'>
                                <div className='h-2 w-1.5 rounded-b-[1px] bg-gradient-to-b from-neutral-400 to-30% via-neutral-500 via-20% to-neutral-500 border-b-[0.5px] border-neutral-400 '></div>
                            </div>
                        })}
                        <div>

                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default FeaturesSection