"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Separator } from "../../../components/ui/separator"
import { registerSchema } from "../../../schema/user"
import api from "api";
import { useState } from "react"
import { AxiosError } from "axios"
import { setAccessToken } from "app/(auth)/handleAuth"

const SignUpPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema)
  });
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    await api.post('/signup', values)
      .then((response) => {
        setAccessToken(response.data.accessToken);
        router.push("/chats");
      })
      .catch((error: AxiosError) => {
        setUsernameErrorMessage(error.response.data.error);
      })
  }

  return (
    <>
      <div className="flex flex-col h-screen items-center
      justify-center space-y-5 drop-shadow-sm bg-gradient">
        <Card className="w-1/6 h-auto">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
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
                  {usernameErrorMessage && <FormMessage>{usernameErrorMessage}</FormMessage>}
                  {form.formState.errors.username &&
                    <FormMessage>{form.formState.errors.username.message}</FormMessage>}
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
                  {form.formState.errors.password &&
                    <FormMessage>{form.formState.errors.password.message}</FormMessage>}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                      </FormItem>
                    )} />
                  {form.formState.errors.confirmPassword &&
                    <FormMessage>{form.formState.errors.confirmPassword.message}</FormMessage>}
                </div>
                <Button type="submit" className="bg-primaryBlue rounded-full
                        self-center w-full">Sign up</Button>
                <Separator />
                <Link href="/" className="text-primaryBlue text-center font-semibold hover:underline">Already have an account?</Link>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default SignUpPage;