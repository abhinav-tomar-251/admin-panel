import Image from "next/image";
import { Poppins } from "next/font/google";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { LoginButton } from "@/components/auth/loginbutton";

const font = Poppins({
  subsets: ["latin"],
  weight: ['600']
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-200 to-slate-600">
      <div className="space-y-6 text-center">
        <h1 className={cn("font-semibold text-4xl drop-shadow-md text-slate-200", font.className,)}>
            Flipr - Admin Panel
        </h1>
        <p className={cn("text-white text-lg", font.className)} >🔐 Go to Login Page</p>
          <LoginButton >
            <Button variant={"secondary"} size={"lg"}>
             Login
            </Button>
          </LoginButton>
      </div>
    </main>
  );
}
