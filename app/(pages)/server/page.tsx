

import { UserInfo } from "@/components/userInfo";
import { currentUser } from "@/lib/auth";

const ServerPage = async () =>{

    const user = await currentUser();
    return (
        <div>
           <UserInfo label="💻 Admin Page" user={user} />
        </div>
    )
};

export default ServerPage;