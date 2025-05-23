import Footer from '@/components/global/footer';
import getUser from '@/components/global/getUser'
import Navbar from '@/components/global/navbar'
import PricingMainSection from '@/components/pricing/main';
import React from 'react'

const page = async () => {
    const user = await getUser();

    return (
        <div>
            <Navbar isLoggedIn={!!user}/>
            <div className='w-full mx-auto'>
                <PricingMainSection/>
            </div>
            <Footer className='border-t border-neutral-800 bg-black/30 backdrop-blur-3xl'/>
        </div>
    )
}

export default page