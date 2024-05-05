"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {

    const handleClick = (provider: "google" | "github") => {
        signIn(provider,{
            callbackUrl: DEFAULT_LOGIN_REDIRECT ,
        });
    }
    return (
        <div className="flex gap-x-2 items-center w-full">
            <Button size={"lg"} className="w-full" variant={"outline"} onClick={() => handleClick("github")} >
                <FaGithub className="h-5 w-5"/>
            </Button>
           <Button size={"lg"} className="w-full" variant={"outline"} onClick={() => handleClick("google")} >
                <FcGoogle className="h-5 w-5"/>
            </Button>
        </div>
    );
}