"use client";

import { useCurrentRole } from "@/hooks/useCurrentRole";
import { UserRole } from "@prisma/client";

interface RoleBaseProps{
    children: React.ReactNode;
    allowedRole: UserRole;
};

export const RoleBase = ({ children, allowedRole }: RoleBaseProps) => {
    const role = useCurrentRole();

    if(role !== allowedRole){
        return (
            <div className="flex justify-center items-center">
                <p className="text-2xl font-semibold text-center">
                    🚫 You are not authorized to view this page.
                </p>
            </div>
        );
    }
        return (
            <>
                {children}
            </>
        )
};