"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Separator } from "../components/ui/separator"
import { loginSchema } from "../schema/user"
import api from "api"
import { AxiosError } from "axios"
import { useState } from "react"

const Home = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema)
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        console.log(values)
        await api.post('/login', values)
            .then((response) => {
                console.log(response)
                router.push("/chats");
            })
            .catch((error: AxiosError) => {
                console.log(error.response.data)
                setErrorMessage(error.response.data);
            })
    }
    console.log("err msg", errorMessage)
    return (
        <>
            <div className="flex flex-col h-screen items-center
      justify-center space-y-5 drop-shadow-sm bg-gradient">
                <Card className="w-1/6 h-auto">
                    <CardHeader>
                        <CardTitle>Log in</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}
                                className="flex flex-col space-y-8">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )} />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )} />
                                    {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
                                </div>
                                <Button type="submit" className="bg-primaryBlue rounded-full
                        self-center w-full">Log in</Button>
                                <Separator />
                                <Link href="/signup" className="text-primaryBlue text-center font-semibold hover:underline">Create an account</Link>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default Home;