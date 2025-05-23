import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'

const MemberListItem: React.FC<{data: {id: string, name: string, avatar: string, bio: string, status: string, roles: number[]}}> = ({data}) => {

  return (
    <div className={`flex ${data.status === "offline" && "opacity-50"}  select-none px-2 py-1.5 cursor-pointer items-center gap-2 rounded-md hover:bg-zinc-900 duration-75`}>
        <div><Avatar>
            <AvatarImage src={data.avatar} ></AvatarImage>
            <AvatarFallback className='select-none'>{data.name.split(" ")[0][0].toLocaleUpperCase() + data.name.split(" ")[1][0].toLocaleUpperCase()}</AvatarFallback>
        </Avatar>
        {data.status == "online" && <div className='w-4 h-4 rounded-full bg-green-500 absolute ml-6 -mt-3 border-[4px] border-neutral-950'></div>}
          </div>
        
        <div className=''>
            <h1 className='text-zinc-300 '>{data.name}</h1>
            {
              data.status === "online" && <div className='flex gap-0.5'>
              {data.roles.includes(4) &&<Badge className='text-xs'>Developer</Badge>}
              {data.roles.includes(5) &&<Badge className='text-xs'>Owner</Badge>}
              {data.roles.includes(3) &&<Badge className='text-xs'>Moderator</Badge>}
              {data.roles.includes(2) &&<Badge className='text-xs'>Support</Badge>}
              {data.roles.includes(0) &&<Badge className='text-xs'>Member</Badge>}
              {data.roles.includes(6) &&<Badge className='text-xs' variant="outline">Expert Trader</Badge>}
                </div>
            }
            
 

        </div>
    </div>
  )
}

export default MemberListItem