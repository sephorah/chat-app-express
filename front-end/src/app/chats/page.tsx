"use client";
import { AvatarFallback, AvatarImage } from "@components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  // <div className="flex flex-col h-screen items-center
  // justify-center space-y-5 drop-shadow-sm bg-gradient">
  //   <h1>Chats</h1>
  //   {/* <ListChats/> */}



  //   <Button onClick={() => {
  //     axios.delete("/api/auth");
  //     router.push("/");
  //   }}>Log out</Button>
  // </div>


  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="bg-violet-400 h-[6%]">
          Contatc
        </div>
        <div className="h-[88%] flex-col space-y-5 justify-end overflow-scroll no-scrollbar">
          {msgs.map((msg) => {
            const alignStyle = (msg.sender == "moi") ? "flex justify-end" : 
            "flex justify-start";
            const colorStyle = (msg.sender == "moi") ? "bg-[#6190E8] text-white" :
            "bg-white text-primaryBlue";

            return (
              <div className={alignStyle + " flex flex-row space-x-2 "}>
                {msg.sender == "pas moi" &&
                  <Avatar>
                    <AvatarImage className={"h-10 rounded-full ml-2" + alignStyle} src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                }
                <p key={msg.msg} className={colorStyle + " border drop-shadow-sm max-w-[80%] px-4 py-3 text-sm font-medium rounded bg-white "}>
                  {msg.msg}
                </p>
                {msg.sender == "moi" && 
                  <Avatar>
                    <AvatarImage className={"h-10 rounded-full " + alignStyle} src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                }
              </div>
            )
          })}
        </div>
        <div className="bg-blue-400 h-[6%]">
          dtuzeyifb
        </div>
      </div>

    </>
  );
}

export default Chats;