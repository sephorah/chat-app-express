import { Chatroom, Message, UserData } from "types";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React from "react";
import api from "api";

interface ChatProps {
  messages?: Message[];
  currentChatroom: Chatroom;
  isMobile: boolean;
}

export function Chat({ messages, currentChatroom, isMobile }: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? []
  );
  const sendMessage = (newMessage: Omit<Message, "id"|"read">) => {
    setMessages([...messagesState, newMessage]);

    // api.post("")
    //   .then((response) => {

    //   })
    //   .catch((error) => {})
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar currentChatroom={currentChatroom} />

      <ChatList
        messages={messagesState}
        currentChatroom={currentChatroom}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
