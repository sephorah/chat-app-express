import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { cn } from "@lib/utils";
import { chatroomSchema } from "schema/chatroom";
import { SquarePen } from "lucide-react";
import { Button, buttonVariants } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, 
  MultiSelectorItem, MultiSelectorList,
  MultiSelectorTrigger } from "@components/ui/multi-selector";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "contexts/user-context";
import { User } from "types";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

interface CreateChatroomDialogProps {
  users: Omit<User, "password"|"createdAt">[]
};

const CreateChatroomDialog = ({ users }: CreateChatroomDialogProps) => {
  const form = useForm<z.infer<typeof chatroomSchema>>({
    resolver: zodResolver(chatroomSchema),
    defaultValues: chatroomSchema.parse({ name: "Chatroom", members: [ users[0].username ]})
  });

  const onSubmit = (values: z.infer<typeof chatroomSchema>) => {
    console.log(values)
  }
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-9 w-9"
        )}>
        <SquarePen size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create a new chatroom</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField control={form.control} name="name"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} defaultValue={""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name="members"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Add people</FormLabel>
                    <MultiSelector
                      onValuesChange={field.onChange}
                      values={field.value}
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select people to invite" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {users.map((user) => (
                            <MultiSelectorItem key={user.id} value={user.username}>
                              <div className="flex items-center space-x-2">
                                <Avatar className="">
                                  <AvatarImage className={"w-8 h-8 rounded-full"}
                                    src={user?.profile?.photoUrl} alt={`${user.username} user picture`} />
                                  <AvatarFallback>{`${user.username[0]}${user.username[1]}`}</AvatarFallback>
                                </Avatar>
                                <span>{user.username}</span>
                              </div>
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateChatroomDialog