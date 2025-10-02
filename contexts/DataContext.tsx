import { ChatWithName } from "@/types/common.type";
import { supabase } from "@/utils/supabase";
import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

interface DataContextProps {
    getChats: () => Promise<ChatWithName[]>;
    createChat: (userId2: string) => Promise<ChatWithName>;
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

    return <DataContext.Provider
        value={{
            getChats,
            createChat
        }}
    >
        {children}
    </DataContext.Provider>
}