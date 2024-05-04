"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./backButton";

interface CardWrapProps {
    children: React.ReactNode;
    headLabel: string;
    backbuttonLabel: string;
    backbuttonHref: string;
    showSocial?: boolean;
};

export const CardWrap = ({ children, headLabel, backbuttonLabel, backbuttonHref, showSocial }: CardWrapProps) => {
    return (
       <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social/>
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backbuttonLabel} href={backbuttonHref}/>
            </CardFooter>
       </Card>
        
    );
};


export default CardWrap;