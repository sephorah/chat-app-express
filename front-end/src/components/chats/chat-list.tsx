import { Chatroom, Message, UserData } from "types";
import { cn } from "@lib/utils"
import React, { useRef } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, m, motion } from "framer-motion";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useAuth } from "contexts/user-context";

interface ChatListProps {
  messages?: Message[];
  currentChatroom: Chatroom;
  sendMessage: (newMessage: Omit<Message, "id"|"createdAt"|"read">) => void;
  isMobile: boolean;
}

export function ChatList({
  messages,
  currentChatroom,
  sendMessage,
  isMobile
}: ChatListProps) {
  const { currentUser, setCurrentUser } = useAuth();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    (currentUser) &&
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => {
          const senderProfile = currentChatroom.members.find((profile) => 
            message.senderId == profile.id);
          
          return (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.senderId !== currentUser.id ? "items-end" : "items-start"
              )}
            >
              <div className="flex flex-col space-y-1">
                {(message.senderId == senderProfile.id) &&
                  <p className={`relative left-14 text-xs w-max`}>{senderProfile.name}</p>
                  }
                <div className="flex gap-3 items-center">
                  {/* message.avatar => get info from senderId*/}
                  {message.senderId === senderProfile.id && (
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={senderProfile.photoUrl}
                        alt={`${senderProfile.name}'s avatar`}
                        width={6}
                        height={6}
                        />
                      <AvatarFallback>{senderProfile.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  {/* (message.name !== currentChatroom.name)  to replace with
                  (message.senderId !== loggedUser.id) */}
                  <span className={` bg-accent p-3 rounded-md max-w-xs 
                    ${(message.senderId !== currentUser.id) && " bg-primary text-white"}`}>
                    {message.body}
                  </span>
                  {message.senderId !== currentUser.id && (
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={senderProfile.photoUrl}
                        alt={`${senderProfile.name}'s avatar`}
                        width={6}
                        height={6}
                        />
                      <AvatarFallback>{senderProfile.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div className={`${(message.senderId !== currentUser.id) ? "flex flex-col items-end "
                  : "flex flex-col items-start"}`}>
                      <p  className="text-xs w-max">{message.createdAt.getHours()}</p>
                </div>
              </div>
            </motion.div>
          )
          })}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile}/>
    </div>
  );
}
