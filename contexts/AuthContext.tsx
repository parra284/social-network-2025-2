import { User } from "@/types/common.type";
import { supabase } from "@/utils/supabase";
import { createContext, useState } from "react";

interface AuthContextProps {
    user: User,
    login: (email: string, password: string) => Promise<void>,
    register: (user: User, password: string) => Promise<void>,
    updateProfile: (profileData: Partial<User>) => Promise<boolean>
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

        if (error) {
            if (error.status === 400) {
                throw new Error("Invalid credentials");
            }
            throw error;
        }   

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

    const updateProfile = async (profileData: Partial<User>) => {
        if (!user.id) throw new Error("No user id")
        
        const { error } = await supabase
            .from('profiles')
            .update({
                ...profileData,
                updated_at: new Date().toISOString()
            })
            .eq('id', user.id);

        if (error) throw error;

        setUser({
            ...user,
            ...profileData
        });

        return true;
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