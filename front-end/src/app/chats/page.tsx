"use client"
// import ListChats from "@/components/chats/list-chats";
import { Button } from "@components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const Chats = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col h-screen items-center
      justify-center space-y-5 drop-shadow-sm bg-gradient">
        <h1>Chats</h1>
        {/* <ListChats/> */}
        <Button onClick={() => {
          axios.delete("/api/auth");
          router.push("/");
        }}>Log out</Button>
      </div>
    </>
  );
}

export default Chats;