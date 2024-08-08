import { cookies } from "next/headers";

const DELETE = async (request: Request) => {
    cookies().delete("accessToken");

    return new Response();
}

const GET = async (request: Request) => {
    const accessToken = cookies().get("accessToken");

    return new Response(JSON.stringify(accessToken));
}

export { DELETE, GET };
