"use server";
import { cookies } from "next/headers";

const setAccessToken = (accessToken: string) => {
    cookies().set({
        name: "accessToken",
        value: accessToken,
        httpOnly: true,
        path: "/",
      });
}

const removeAccessToken = () => {
  cookies().delete("accessToken");
}

export { setAccessToken, removeAccessToken };