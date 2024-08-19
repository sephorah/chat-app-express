import { cookies } from "next/headers";

const GET = async () => {
    const layout = cookies().get("react-resizable-panels:layout");
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

    return new Response(JSON.stringify(defaultLayout));
}

export { GET };