// src/context/AuthContext.tsx
import type { ReactNode } from "react"
import React, { createContext, useContext, useState, useEffect } from "react";
import type { AuthState, User } from "@/types/Account";

interface AuthContextProps extends AuthState {
    login: (user: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

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
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } catch {
                console.error("Failed to parse stored user");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
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
        <AuthContext.Provider value={{ user, token, login, logout }}>
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
