// src/context/AuthContext.tsx
import type { ReactNode } from "react"
import React, { createContext, useContext, useState, useEffect } from "react";
import type { AuthState, User } from "@/types/Account";

interface AuthContextProps extends AuthState {
    login: (user: User, token: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);

    const login = (user: User, token: string) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("auth", JSON.stringify({ user, token }));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("auth");
    };

    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            try {
                const { user, token } = JSON.parse(storedAuth);
                setUser(user);
                setToken(token);
            } catch {
                console.error("Failed to parse auth");
                localStorage.removeItem("auth");
            }
        }
        setLoading(false);
    }, []);


    useEffect(() => {
        if (user && token) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }, [user, token]);


    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
