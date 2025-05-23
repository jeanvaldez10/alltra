import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import formatDate from '@/lib/format-date';
import getTime from '@/lib/get-time';
import { Message } from '../../../@types';

interface ChatMessageProps {
    full_name: string,
    content: string,
    id: string,
    avatar: string,
    user_id: string,

    is_same_user: boolean,
    createdAt: Date,
    isLoading: boolean,
    is_selected?: boolean,
    is_edit_mode?: boolean,
    editMessage?: Message,
    setEditMessage?: React.Dispatch<React.SetStateAction<Message>>,
    setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>,
    EditSubmit?: (e: React.FormEvent) => Promise<void>
}

const ChatMessageItem: React.FC<ChatMessageProps> = ({ EditSubmit, setEditMessage, setIsEditMode, editMessage, is_edit_mode, is_selected, full_name, content, id, avatar, user_id, is_same_user, createdAt, isLoading }) => {
    const [first_name, last_name] = full_name ? full_name?.split(" ") : "John Doe";

    return (
        <div className={` ${is_same_user ? "-mt-1.5 [&:hover>span]:opacity-100  py-[2px]" : ""}  flex gap-4 rounded-none px-4 items-center w-full hover:bg-zinc-800/50 ${is_selected && "bg-zinc-800/50"} `}>
            {!is_same_user && <Avatar className='cursor-pointer'>
                <AvatarImage src={avatar}></AvatarImage>
                <AvatarFallback className='select-none'>{first_name[0]?.toLocaleUpperCase() + last_name[0]?.toLocaleUpperCase()}</AvatarFallback>
            </Avatar>}
            {is_same_user && <span className='text-xs select-none text-zinc-400 opacity-0 -ml-1.5 w-16 min-w-16 max-w-16'>{getTime(createdAt)}</span>}
            <div className={is_same_user ? "-ml-[21px]" : ""}>
                {!is_same_user && <div className='flex items-center'><h1 className='font-semibold text-l hover:underline cursor-pointer'>{full_name}</h1> <span className='ml-1.5 text-xs text-zinc-300'>{formatDate(createdAt)}</span></div>}

                <p className={`font-normal ${isLoading && "text-zinc-400"}`}>{content}</p>
            </div>
        </div>
    )
}


/**
 *  <div key={_key} className={` ${is_same_user ? "-mt-1.5 [&:hover>span]:opacity-100  py-[2px]" : ""}  flex gap-4 rounded-none ${editMessage.id !== id && "px-4"} items-center w-full hover:bg-zinc-800/50 ${is_selected && "bg-zinc-800/50"} `}>
            {!is_same_user && <Avatar className='cursor-pointer'>
                <AvatarImage src={avatar}></AvatarImage>
                <AvatarFallback className='select-none'>{first_name[0].toLocaleUpperCase() + last_name[0].toLocaleUpperCase()}</AvatarFallback>
            </Avatar>}
            {editMessage.id !== id && is_same_user && <span className='text-xs select-none text-zinc-400 opacity-0 -ml-1.5 w-16 min-w-16 max-w-16'>{getTime(createdAt)}</span>}
            {editMessage?.id == id && is_edit_mode ? <div className='bg-zinc-800/50 py-2 w-full'><div className=' mx-16 bg-neutral-800 h-12 rounded-lg my-auto px-4 flex gap-5 items-center'><form onSubmit={EditSubmit} className='w-full'>
                <input

                    autoFocus onChange={(e) => {
                        setEditMessage((prev) => ({ ...prev, content: e.target.value }))
                    }} value={editMessage.content} className='bg-transparent focus:outline-none placeholder-neutral-400  font-normal w-full'></input>
            </form>

            </div>
                <p className='ml-16 text-xs'><button className='text-blue-500 hover:underline' onClick={() => {
                    setEditMessage({ content: "", id: "", by: { username: "", id: "", full_name: "", subscription: 0, roles: [0], email: "", createdAt: new Date() }, createdAt: new Date(), channel: "" });
                    setIsEditMode(false)
                }}>cancel</button> - click enter to <button className='text-blue-500 hover:underline' onClick={(e) => {
                    EditSubmit(e)
                }}>save</button></p></div> : <div className={is_same_user ? "-ml-[21px]" : ""}>
                {!is_same_user && <div className='flex items-center'><h1 className='font-semibold text-l hover:underline cursor-pointer'>{full_name}</h1> <span className='ml-1.5 text-xs text-zinc-300'>{formatDate(createdAt)}</span></div>}

                <p className={`font-normal ${isLoading && "text-zinc-400"}`}>{content}</p>
            </div>}

        </div>
 */

export default ChatMessageItem