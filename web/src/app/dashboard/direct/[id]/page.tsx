import React from 'react'
import DirectMain from '@/components/direct/DirectMain';
import getUser from '@/components/global/getUser';
import { User } from '../../../../../@types';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const param = await params;
    const user = await getUser();

    return (
        <div className='p-8 w-full h-full'>
            <DirectMain id={param.id} user={user as User} />
        </div>
    )
}

export default page;