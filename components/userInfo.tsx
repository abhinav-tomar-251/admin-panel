
import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge  } from "./ui/badge";

interface UserInfoProps{
    user?: ExtendedUser;
    label: string;
};

export const UserInfo = ({ user, label }: UserInfoProps) => {
    return (
        <Card className="w-[500px] shadow-md">
            <CardHeader>
                <p className="text-center text-2xl font-semibold">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row justify-between items-center rounded-lg p-3 shadow-sm border">
                    <p className="text-sm font-medium">
                        ID
                    </p>
                    <p className="text-sm font-light truncate max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.id}
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center rounded-lg p-3 shadow-sm border">
                    <p className="text-sm font-medium">
                        Name
                    </p>
                    <p className="text-sm font-light truncate max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center rounded-lg p-3 shadow-sm border">
                    <p className="text-sm font-medium">
                        Email
                    </p>
                    <p className="text-sm font-light truncate max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center rounded-lg p-3 shadow-sm border">
                    <p className="text-sm font-medium">
                        Role
                    </p>
                    <Badge  >
                        {user?.role}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}