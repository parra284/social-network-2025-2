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
        console.log("User:", data.user);       // Supabase user object
        console.log("Session:", data.session);
        setUser(data.user);
        return true;
    }

    const register = async (user: User, password: string): Promise<boolean> => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: user.email,
                password,
                options: {
                    data: {
                        name: user.name
                    }
                }
            });

            if (error) {
                console.error('Registration error:', error.message);
                throw new Error(error.message);
            }

            if (data.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: data.user.id,
                        email: user.email,
                        name: user.name,
                        username: user.username
                    });

                if (profileError) {
                    console.error('Profile creation error:', profileError.message);
                    throw new Error(`Error creando perfil: ${profileError.message}`);
                }


                return true;
            }

            return false;
        } catch (error) {
            console.error('Registration error:', error);
            return false;
        }
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