import Direct from '@/components/direct/main';
import getUser from '@/components/global/getUser';
import React from 'react'
import { User } from '../../../../@types';

const page = async () => {
  const user = await getUser()
  return (
    <div className='w-full h-full p-8'>
      <Direct user={user as User}/>
    </div>
  )
};

export default page;