// Code: src/app/about/page.tsx
import HeroSection from '@/components/about/HeroSection';
import getUser from '@/components/global/getUser';
import Navbar from '@/components/global/navbar';
import { Spotlight } from '@/components/ui/spotlight-new';

import React from 'react'

const page = async () => {
    const user = await getUser();

    return (
        <div >
            <Navbar isLoggedIn={!!user} />

            <HeroSection user={user} />
        </div>

    )
}

export default page