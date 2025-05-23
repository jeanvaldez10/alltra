export type User = {
    username: string,
    id: string,
    email: string
    roles: number[],
    subscription: number,
    createdAt: Date,
    password?: string,
    full_name: string
}

export type FormDataType = {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    verification_code: string;
};

export type Category = {
    name: string;
    id: string;
    channels: string[];
    createdAt: Date;
}

export type Channel = {
    name: string;
    parent: string;
    id: string;
    pinned: string[];
    permissions: number[];
    createdAt: Date
}


export type Message = {
    content: string;
    id: string;
    by: User;
    createdAt: Date
    channel: string
    isLoading?: boolean
    code?: string
}

export interface ContactFormProps {
    isLoggedIn: boolean,
    user: User | null
}

export type ContactFormType = {
    name: string,
    email: string,
    phone: string,
    message: string,
    reason: ContactReason
}

export enum ContactReason {
    BILLING = 0,
    BUG = 1,
    FEEDBACK = 2,
    OTHER = 3
}

export const ContactFormInit: ContactFormType = {
    name: "",
    email: "",
    phone: "",
    message: "",
    reason: 0
}


export enum Events {
    MESSAGE_CREATE = 0,
    MESSAGE_UPDATE = 1,
    MESSAGE_DELETE = 2,
    MESSAGE_READ = 3,
    MESSAGE_REACTION_ADD = 4,
    MESSAGE_REACTION_REMOVE = 5,
    CHANNEL_CREATE = 6,
    CHANNEL_UPDATE = 7,
    CHANNEL_DELETE = 8,
    CHANNEL_JOIN = 9,
    NOTIFICATION_CREATE = 10,
    NOTIFICATION_READ = 12,
    USER_UPDATE = 14,
    USER_DELETE = 15,
    MEMBER_JOIN = 16,
    MEMBER_LEAVE = 17,
    PAGE_CHANGE = 18,
    MEMBER_STATUS_CHANGE = 19,
    DIRECT_MESSAGE_CREATE = 20
}

export enum Roles {
    USER = 0,
    MODERATOR = 1,
    ADMIN = 2,
    MENTORSHIP = 3,
    DEVELOPER = 4,
    OWNER = 5,
    EXPERT_TRADER = 6,
    EXPERT_ANALYST = 7,
    EXPERT_DEVELOPER = 8,
    EXPERT_MARKETER = 9,
    EXPERT_SALES = 10

}

export type Direct = {
    id: string;         // Maps to String with @db.ObjectId
    members: string[];  // Maps to String[] with @db.ObjectId (array of User IDs)
    pinned: string[];   // Maps to String[] (array of message IDs)
    createdAt: Date;    // Maps to DateTime, represented as JavaScript Date
};