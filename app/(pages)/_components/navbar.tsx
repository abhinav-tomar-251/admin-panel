"use client";

import exp from "constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { UserButton } from "@/components/auth/userButton";


export const Navbar = () => {
    const pathname = usePathname();
    return (
        <nav className="w-[600px] rounded-xl shadow-sm flex justify-between items-center p-4 bg-secondary">
            <div className="flex gap-x-2">
                <Button variant={pathname === "/server"? "default":"outline"} asChild>
                    <Link href="/server">Server</Link>
                </Button>
                <Button variant={pathname === "/client"? "default":"outline"} asChild>
                    <Link href="/client">Client</Link>
                </Button>
                <Button variant={pathname === "/admin"? "default":"outline"} asChild>
                    <Link href="/admin">Admin</Link>
                </Button>
                <Button variant={pathname === "/settings"? "default":"outline"} asChild>
                    <Link href="/settings">Settings</Link>
                </Button>
            </div>
            <UserButton />
        </nav>
    );
};