import { ChatWithName, Message } from "@/types/common.type";
import { supabase } from "@/utils/supabase";
import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

interface DataContextProps {
    getChats: () => Promise<ChatWithName[]>;
    getMessages: (chatId: string) => Promise<Message[]>;
    createChat: (userId2: string) => Promise<ChatWithName>;
    sendMessage: (chatId: string, text: string, sentBy: string) => Promise<void>;
}

export const DataContext = createContext({} as DataContextProps);

export const DataProvider = ({ children }: any) => {
    // variables
    const { user } = useContext(AuthContext);

    // functions
    const getChats = async (): Promise<ChatWithName[]> => {
        const { data, error } = await supabase
        .from("chats")
        .select(`
            id, 
            user_id_1, 
            user_id_2,
            user1:profiles!chats_user_id_1_fkey(name),
            user2:profiles!chats_user_id_2_fkey(name)
            `)
        .or(`user_id_1.eq.${user.id},user_id_2.eq.${user.id}`);

        if (error) throw error;

        return (
            data.map((chat: any) => ({
                id: chat.id,
                userId1: chat.user_id_1,
                userId2: chat.user_id_2,
                name:
                    chat.user_id_1 === user.id ? chat.user2.name : chat.user1.name,
            })) ?? []
        );
    };

    const getMessages = async (chatId: string): Promise<Message[]> => {
        const { data, error } = await supabase
        .from("messages")
        .select("id, text, created_at, sent_at, sent_by, chat_id")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });

        if (error) throw error;

        return (
        data?.map((m: any) => ({
            id: m.id,
            text: m.text,
            createdAt: new Date(m.created_at),
            sentAt: m.sent_at,
            sentBy: m.sent_by,
            chatId: m.chat_id,
        })) ?? []
        );
    };

    const createChat = async (username: string): Promise<ChatWithName> => {
        // 1. Find user by username
        const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("id, name")
            .eq("username", username)
            .single();

        if (profileError || !profile) {
            throw profileError;
        }

        // 2. Insert chat using found id
        const { data: chat, error: chatError } = await supabase
            .from("chats")
            .insert([{ user_id_1: user.id, user_id_2: profile.id }])
            .select()
            .single();

        if (chatError) throw chatError;

        // 3. Return name of the user in the chat
        return {
            id: chat.id,
            userId1: chat.user_id_1,
            userId2: chat.user_id_2,
            name: profile.name
        };
    };

    const sendMessage = async (
        chatId: string,
        text: string,
        sentBy: string
    ): Promise<void> => {
        const { error } = await supabase.from("messages").insert([
        {
            text,
            chat_id: chatId,
            sent_by: sentBy,
            created_at: new Date().toISOString()
        },
        ]);

        if (error) throw error;
    };

    return <DataContext.Provider
        value={{
            getChats,
            getMessages,
            createChat,
            sendMessage
        }}
    >
        {children}
    </DataContext.Provider>
}