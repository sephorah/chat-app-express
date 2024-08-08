import NavBar from "@components/chats/navbar";
import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function ChatsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={inter.className}>
            <div className="flex flex-row h-screen w-screen">
                <div className="bg-red-200 w-1/3">
                    <NavBar/>
                </div>
                <div className="w-2/3">
                    {children}
                </div>
            </div>
        </div>
    );
}
