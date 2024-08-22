"use server";
import api from "api";
import { cookies } from "next/headers";

const POST = async (request: Request) => {
  const values = await request.json();
  
  try {
    const response = await api.post('/login', values);
    const accessToken = response.data.accessToken;
    cookies().set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      path: "/",
    });
    return new Response(JSON.stringify(response.data.user));
  } catch (error) {
    console.log(error.response.data)
    return new Response(JSON.stringify(error.response.data), {
      status: error.response.status
    });
  }
}

export { POST };
