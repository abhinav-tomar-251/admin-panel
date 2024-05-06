"use client";

import { UserInfo } from "@/components/userInfo";
import { useCurrentUser } from "@/hooks/currentUser";
import { currentUser } from "@/lib/auth";

const ClientPage = () =>{

    const user =  useCurrentUser();
    return (
        <div>
           <UserInfo label="👨‍💻 Client Page" 
           user={user} />
        </div>
    )
};

export default ClientPage;