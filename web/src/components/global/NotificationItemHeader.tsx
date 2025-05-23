import { X } from 'lucide-react'
import React from 'react'

const NotificationItemHeader = () => {
    const [isCryptoBankNoti, setIsCryptoBankNoti] = React.useState(true)
    return (
        <div className={`${!isCryptoBankNoti && "hidden"} flex gap-2 items-center p-1 rounded-2xl border border-neutral-800`}>
            <div className='h-9 bg-blue-600 w-14 rounded-xl justify-center flex items-center -ml-px '>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-7">
                    <path fillRule="evenodd" d="M9.674 2.075a.75.75 0 0 1 .652 0l7.25 3.5A.75.75 0 0 1 17 6.957V16.5h.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H3V6.957a.75.75 0 0 1-.576-1.382l7.25-3.5ZM11 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7.5 9.75a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0v-5.5Zm3.25 0a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0v-5.5Zm3.25 0a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0v-5.5Z" clipRule="evenodd" />
                </svg>

            </div>
            <div>
                <h1 className='text-sm'>BTC/USD</h1>
                <p className='text-xs text-neutral-500'>Binance</p>
            </div>
            <X className='size-4 mx-2 text-neutral-500 cursor-pointer' onClick={() => setIsCryptoBankNoti(false)} />
        </div>
    )
}

export default NotificationItemHeader