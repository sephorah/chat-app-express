"use client";

import Link from "next/link";
import { cn } from "@lib/utils";
import { buttonVariants } from "@components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@components/ui/tooltip";
import { Message } from "types";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import CreateChatroomDialog from "./chats/create-chatroom-dialog";

interface SidebarProps {
  isCollapsed: boolean;
  links: {
    name: string;
    messages: Message[];
    photoUrl?: string;
    variant: "grey" | "ghost";
  }[];
  onClick?: () => void;
  isMobile: boolean;
}

export function Sidebar({ links, isCollapsed, isMobile }: SidebarProps) {

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({links.length})</span>
          </div>

          <div>
            <CreateChatroomDialog/>
          </div>
        </div>
      )}
      <nav className="grid gap-5 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-11 w-11 md:h-16 md:w-16",
                      link.variant === "grey" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={link.photoUrl}
                        alt={link.photoUrl}
                        width={6}
                        height={6}
                        className="w-10 h-10 "
                      />
                      <AvatarFallback>{link.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: link.variant, size: "xl" }),
                link.variant === "grey" &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
                "justify-start gap-4"
              )}
            >
              {link.photoUrl && <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={link.photoUrl}
                  alt={link.photoUrl}
                  width={6}
                  height={6}
                  className="w-10 h-10 "
                />
              </Avatar>}
              <div className="flex flex-col max-w-full">
                <span>{link.name}</span>
                {link.messages.length > 0 && (
                  <span className="text-zinc-300 text-xs truncate ">
                    {link.messages[link.messages.length - 1].senderName}
                    : {link.messages[link.messages.length - 1].body}
                  </span>
                )}
              </div>
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
