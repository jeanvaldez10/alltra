"use client";

import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import useMembersListStore, { Member } from '@/hooks/use-chat-members'
import { useWebSocketStore } from '../../../client/websocket';
import { Events, User } from '../../../@types';
import axios from 'axios';
import { Constants } from '../../../client/constants';
import MemberListItem from './MemberListItem';

const MembersList: React.FC<{ user: User }> = ({ user }) => {
    const memberList = useMembersListStore();
    const members = useMembersListStore(state => state.members);
    const socket = useWebSocketStore(state => state.socket);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                if (members[0]?.id) return;
                const response = await axios.get(`${Constants.API_BASE}/chat/members`, { withCredentials: true });
                const new_member_list = response.data.map((member: Member) =>
                    member.id === user.id ? { ...member, status: "online" } : member
                );
                memberList.setMembers(new_member_list);
            } catch (error) {
                console.error("Failed to fetch members:", error);
            }
        };
        fetchMembers();
    }, []);

    const messageRecievedHandler = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        console.log(data)
        if (data.e === Events.MEMBER_STATUS_CHANGE) {
            const new_member_list = members.map(member =>
                member.id === data.d.id ? { ...member, status: data.d.status } : member
            );
            memberList.setMembers(new_member_list);
        }
    };

    socket?.addEventListener('message', messageRecievedHandler);




    // Filter members based on search query
    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div
            className={`${memberList.isMembersListVisible
                ? "w-96 opacity-100 p-4 border-l"
                : "w-0 opacity-0 hidden "
                } h-full   bg-neutral-950  overflow-hidden transition-[width,opacity,padding] duration-300 ease-in-out`}
        >
            <div className="flex flex-col">
                <div className="flex justify-between items-center bg-neutral-950 border gap-2 px-2 pr-4 rounded-lg">
                    <input
                        placeholder="Search..."
                        className="py-2 pl-2.5 focus:outline-none bg-transparent focus:ring-0 focus:border-0"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="size-5 text-neutral-400" />
                </div>
            </div>
            <div className='h-full w-full flex flex-col gap-4 mt-4'>
                {filteredMembers.some(member => member.status === "online") && (
                    <div>
                        <h2 className="text-xs">ONLINE - {filteredMembers.filter((member) => member.status == "online").length}</h2>
                        <div className="flex flex-col gap-2 mt-2">
                            {filteredMembers.filter(member => member.status === "online").map((member, i) => (
                                <MemberListItem key={`online-${i}`} data={member} />
                            ))}
                        </div>
                    </div>
                )}

                {filteredMembers.some(member => member.status === "offline") && (
                    <div>
                        <h2 className="text-xs">OFFLINE - {filteredMembers.filter((member) => member.status == "offline").length}</h2>
                        <div className="flex flex-col gap-2 mt-2">
                            {filteredMembers.filter(member => member.status === "offline").map((member, i) => (
                                <MemberListItem key={`offline-${i}`} data={member} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MembersList;
