"use client";
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
import { SendHorizonal, SendHorizonalIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { messageSchema } from "schema/message";
import { z } from "zod";

const msgs = [
  {
    sender: "moi",
    msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
  },
  {
    sender: "pas moi",
    msg: "Suspendisse ornare mauris non lobortis mattis."
  },
  {
    sender: "moi",
    msg: "Donec vel erat ut quam accumsan suscipit. Maecenas eget ligula cursus"
  },
  {
    sender: "pas moi",
    msg: " vulputate tellus sit amet, ultrices neque."
  },
  {
    sender: "moi",
    msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
  },
  {
    sender: "pas moi",
    msg: "Suspendisse ornare mauris non lobortis mattis."
  },
  {
    sender: "moi",
    msg: "Donec vel erat ut quam accumsan suscipit. Maecenas eget ligula cursus"
  },
  {
    sender: "pas moi",
    msg: " vulputate tellus sit amet, ultrices neque."
  },
  {
    sender: "moi",
    msg: "Nam posuere ante nibh, in commodo quam scelerisque eget. "
  },
  {
    sender: "moi",
    msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at elit vel magna ultrices aliquam. Mauris eu fermentum mauris. Ut facilisis, sem sagittis egestas lobortis, neque elit luctus libero, at congue felis tellus ut risus. Nullam luctus non erat vitae malesuada. Phasellus ultrices ex et purus pharetra, a luctus metus hendrerit. Nunc non nisi massa. Curabitur at sollicitudin tortor. Aliquam id nisl id mauris porta fermentum. Cras mollis lacus sed sapien consectetur condimentum. Curabitur finibus magna quis rutrum fermentum. Vestibulum semper ultrices ullamcorper. Aliquam id ipsum viverra, suscipit leo vitae, sagittis velit. Aenean at convallis libero."
  },
  {
    sender: "pas moi",
    msg: " vulputate tellus sit amet, ultrices neque."
  },
  {
    sender: "moi",
    msg: "Nam posuere ante nibh, in commodo quam scelerisque eget. "
  },
  {
    sender: "pas moi",
    msg: "Nunc non nisi massa. Curabitur at sollicitudin tortor. Aliquam id nisl id mauris porta fermentum. Cras mollis lacus sed sapien consectetur condimentum. Curabitur finibus magna quis rutrum fermentum. Vestibulum semper ultrices ullamcorper. Aliquam id ipsum viverra, suscipit leo vitae, sagittis velit. Aenean at convallis libero."
  },
  {
    sender: "moi",
    msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
  },
  {
    sender: "pas moi",
    msg: "Suspendisse ornare mauris non lobortis mattis."
  },
  {
    sender: "moi",
    msg: "Donec vel erat ut quam accumsan suscipit. Maecenas eget ligula cursus"
  },
  {
    sender: "pas moi",
    msg: " vulputate tellus sit amet, ultrices nequ2e."
  },
  {
    sender: "moi",
    msg: "Nam posuere ante nibh, in commodo quam scelerisque eget. "
  },
  {
    sender: "pas moi",
    msg: "Nunc non nisi massa. Curabitur at sollicitudin tortor. Aliquam id nisl id mauris porta fermentum. Cras mollis lacus sed sapien consectetur condimentum. Curabitur finibus magna quis rutrum fermentum. Vestibulum semper ultrices ullamcorper. Aliquam id ipsum viverra, suscipit leo vitae, sagittis velit. Aenean at convallis libero."
  },
  {
    sender: "moi",
    msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
  },
  {
    sender: "pas moi",
    msg: "Suspendisse ornare mauris non lobortis mattis."
  },
  {
    sender: "moi",
    msg: "Donec vel erat ut quam accumsan suscipit. Maecenas eget ligula cursus"
  },
  {
    sender: "pas moi",
    msg: " vulputate tellus sit amet, ultrices nequ2e."
  },
  {
    sender: "moi",
    msg: "Nam posuere ante nibh, in commodo quam scelerisque eget. "
  },
  {
    sender: "pas moi",
    msg: "Nunc non nisi massa. Curabitur at sollicitudin tortor. Aliquam id nisl id mauris porta fermentum. Cras mollis lacus sed sapien consectetur condimentum. Curabitur finibus magna quis rutrum fermentum. Vestibulum semper ultrices ullamcorper. Aliquam id ipsum viverra, suscipit leo vitae, sagittis velit. Aenean at convallis libero."
  },
  {
    sender: "moi",
    msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
  },
  {
    sender: "pas moi",
    msg: "Suspendisse ornare mauris non lobortis mattis."
  },
  {
    sender: "moi",
    msg: "Donec vel erat ut quam accumsan suscipit. Maecenas eget ligula cursus"
  },
  {
    sender: "pas moi",
    msg: " vulputate tellus sit amet, ultrices mamamm."
  },
]

const Chats = () => {
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema)
  });

  
  const onSubmit = (values: z.infer<typeof messageSchema>) => {
    console.log(values)
  }

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="h-[7%] border shadow-md w-auto flex flex-row space-x-4">
          <Avatar className="content-center ml-2 ">
            <AvatarImage className={"rounded-full h-[60%] m-auto"} src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h3 className="content-center">Emily</h3>
        </div>
        <div className="h-[83%] flex-col space-y-5 justify-end overflow-scroll no-scrollbar">
          {msgs.map((msg) => {
            const alignStyle = (msg.sender == "moi") ? "flex justify-end" : 
            "flex justify-start";
            const colorStyle = (msg.sender == "moi") ? "bg-primaryBlue text-white" :
            "bg-white text-primaryBlue";

            return (
              <div className={`${alignStyle} flex flex-row space-x-2`} key={msg.msg}>
                {msg.sender == "pas moi" &&
                  <Avatar className="">
                    <AvatarImage className={"w-10 min-w-10 h-10 rounded-full ml-2 "} src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                }
                <div className={`${((msg.sender == "moi") ? "items-end" : "items-start")} flex flex-col space-y-1`}>
                  <p className={`${colorStyle} border drop-shadow-sm max-w-[60%] px-4 py-3 text-sm font-medium rounded`}>
                    {msg.msg}
                  </p>
                    <p className={"text-sm w-max"}>{msg.sender}</p>
                    <p className={"text-sm w-max"}>18:07</p>
                </div>
                {msg.sender == "moi" && 
                  <Avatar className="">
                    <AvatarImage className={"w-10 min-w-10 rounded-full h-10 ml-2"} src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                }
              </div>
            )
          })}
        </div>
        <div className="h-[10%] rounded-lg p-1 overflow-hidden no-scrollbar flex-row">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-row">
                <FormField control={form.control} name="body"
                  render={({ field }) => (
                    <FormItem className="w-[95%]">
                      <FormControl>
                        <Textarea onSubmit={form.handleSubmit(onSubmit)} {...field} placeholder="Write something..."
                          className="w-[100%] no-scrollbar focus-visible:ring-offset-0 focus-visible:ring-0" />
                      </FormControl>
                      </FormItem>
                    )} />
                  <Button type="submit" className="w-[5%] h-auto align-middle">
                    <SendHorizonalIcon size={30}/>
                  </Button>
                </div>
              </form>
            </Form>
        </div>
      </div>

    </>
  );
}

export default Chats;