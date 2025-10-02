import { User } from "@/types/common.type";
import { supabase } from "@/utils/supabase";
import { decode } from 'base64-arraybuffer-es6';
import { File } from 'expo-file-system';
import { createContext, useState } from "react";

interface AuthContextProps {
    user: User,
    login: (email: string, password: string) => Promise<void>,
    register: (user: User, password: string) => Promise<void>,
    updateProfile: (profileData: Partial<User>, avatarUri?: string) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null as any);

    const fetchData = async (userId: string) => {
        const { data , error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

        if (error) throw error;

        setUser(data);
    };

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) throw error;

        if (data.user) {
            await fetchData(data.user.id);
        }
    }

    const register = async (user: User, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password,
            options: {
                data: {
                    name: user.name,
                    username: user.username
                }
            }
        });

        if (error) throw error;

        if (data.user) {
            const { error } = await supabase
                .from('profiles')
                .insert({
                    id: data.user.id,
                    email: user.email,
                    name: user.name,
                    username: user.username
                });

            if (error) throw error;

            await fetchData(data.user.id);
        }
    }

    const updateProfile = async (profileData: Partial<User>, avatarUri?: string) => {
        try {
            let avatar_url = user.avatar_url;

            if (avatarUri && !avatarUri.startsWith("http")) {
                const base64 = await new File(avatarUri).base64();
            
                const fileName = `public/avatars/${user.id}-${Date.now()}.jpg`;
            
                // Upload to avatars bucket
                const { error } = await supabase.storage
                    .from("avatars")
                    .upload(fileName, decode(base64), {
                    contentType: "image/jpeg",
                    cacheControl: "3600",
                    upsert: true,
                    });
            
                if (error) throw error;
            
                // Get public URL
                const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
            
                if (!data) throw new Error("getPublicUrl Error");

                avatar_url = data.publicUrl
            
                // Delete old path if there was already an image
                if (user.avatar_url) {
                    const oldPath = user.avatar_url.split("/object/public/avatars/")[1]; 
            
                    const { error } = await supabase.storage
                    .from("avatars")
                    .remove([oldPath]);
            
                    if (error) throw error;
                }
            }

            const { error } = await supabase
                .from('profiles')
                .update({
                    ...profileData,
                    avatar_url,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (error) throw error;

            setUser({
                ...user,
                ...profileData,
                avatar_url
            });
        } catch (error){
            console.error("Error en updateProfile: ", error);
            throw error;
        }
    };

    return <AuthContext.Provider
        value={{
            user,
            login,
            register,
            updateProfile
        }}
    >
        {children}
    </AuthContext.Provider>
}