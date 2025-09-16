import { User } from "@/types/common.type";
import { supabase } from "@/utils/supabase";
import { createContext, useState } from "react";

interface AuthContextProps {
    user: User | null,
    login: (email: string, password: string) => Promise<boolean>,
    register: (user: User, password: string) => Promise<boolean>
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    // varibles
    // USER -> { email:string, password:string, name:string}
    const [user, setUser] = useState(null as any);

    // funciones

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error || !data.user) {
            console.error("Supabase login error:", error?.message);
            return false;
        }
        setUser(data.user);
        return true;
    }

    const register = async (user: User, password: string): Promise<boolean> => {
        const { data, error } = await supabase.auth.signUp({ email: user.email, password });
        if (error) {
            console.error("Supabase register error:", error.message);
            return false;
        }
        return true;
    }

    return <AuthContext.Provider
        value={{
            user,
            login,
            register,
        }}
    >
        {children}
    </AuthContext.Provider>
}