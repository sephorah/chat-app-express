"use client";
import { AuthProvider } from "contexts/user-context";

export default function ChatsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}