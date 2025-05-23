import { create } from "zustand";

export interface Member {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  status: string;
  roles: number[];
}

interface MembersListStore {
  isMembersListVisible: boolean;
  toggleMembersList: () => void;
  members: Member[];
  setMembers: (newMembers: Member[]) => void;
}

const useMembersListStore = create<MembersListStore>((set) => ({
  isMembersListVisible: true, // Initial state
  toggleMembersList: () => set((state) => ({ isMembersListVisible: !state.isMembersListVisible })),
  members: [],
  setMembers: (newMembers) => set({ members: newMembers }),
}));

export default useMembersListStore;
