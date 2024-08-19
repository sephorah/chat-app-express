"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "types";

interface TAuthContext {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

const AuthContext = createContext<TAuthContext>({
    currentUser: null,
    setCurrentUser: () => {}
});

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        if (!currentUser) {
            const user = localStorage.getItem("currentUser");
            if (user) {
                setCurrentUser(JSON.parse(user));
            }
        } else {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }
    }, [currentUser]);

    return (
        <AuthContext.Provider
            value={{ currentUser, setCurrentUser }}>
                {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth }