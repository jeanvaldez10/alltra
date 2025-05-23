import getUser from '@/components/global/getUser'
import Navbar from '@/components/global/navbar'
import React from 'react'

const page = () => {
    const user = getUser();

  return (
    <div>
        <Navbar isLoggedIn={!!user}/>
    </div>
  )
}

export default page