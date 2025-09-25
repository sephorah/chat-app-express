"use client";
import { ChatLayout } from "@components/chats/chat-layout";
import { AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@radix-ui/react-avatar";
import axios from "axios";
import { AuthContext, AuthProvider, useAuth } from "contexts/user-context";
import { SendHorizonal, SendHorizonalIcon, SendIcon } from "lucide-react";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { messageSchema } from "schema/message";
import { z } from "zod";
import socket from "socket";


const Chats = () => {
  const { currentUser, setCurrentUser} = useContext(AuthContext);
  const [defaultLayout, setDefaultLayout] = useState();
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema)
  });

  const onSubmit = (values: z.infer<typeof messageSchema>) => {
    console.log(values)
  }
  console.log(currentUser?.username)
  console.log(currentUser?.profile?.name)
  useEffect(() => {
    console.log(socket)
    if (socket.connected) {
      console.log("Socket connected")
    }
    axios.get("/api/layout")
      .then((response) => {
        console.log(response)
        setDefaultLayout(response.data);
      })
  }, []);

  return (
    <>
      <div className="h-screen w-screen">
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={5} />
      </div>
    </>
  );
}

export default Chats;