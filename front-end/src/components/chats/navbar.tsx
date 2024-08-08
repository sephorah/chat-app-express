"use client";
import { Button } from "@components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const NavBar = () => {
    const router = useRouter();

    return (
        <>
            {/* <Button onClick={() => {
                axios.delete("/api/auth");
                router.push("/");
            }}>Log out</Button> */}
        </>
    )
}

export default NavBar;