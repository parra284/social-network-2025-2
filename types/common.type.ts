export interface User {
    id: string,
    email: string,
    name: string,
    username: string,
    avatar_url?: string,
    bio?: string,
    followers_count?: number,
    following_count?: number,
    posts_count?: number,
    created_at?: Date,
    updated_at?: Date
}

export interface Media {
    id: string,
    url: string,
    type: 'image' | 'video' | 'document' | 'audio',
    message_id: string
}

export interface Message {
    id: string,
    text: string,
    createdAt: Date,
    deletedAt?: Date,
    seenAt?: Date,
    sentAt: Date,
    sentBy: string,
    chatId: string
}

export interface Chat {
    id: string,
    userId1: string,
    userId2: string,
    created_at?: Date,
    updated_at?: Date
}

export interface ChatWithName extends Chat {
  name: string;
}