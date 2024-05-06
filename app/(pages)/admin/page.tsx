"use client";

import { RoleBase } from "@/components/auth/roleBase";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";

const AdminPage = () => {


    return (
        <Card className="w-[500px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🤖 Admin
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleBase allowedRole={UserRole.ADMIN}>
                    <p className="text-lg font-semibold text-center">
                        Welcome to the admin page.
                    </p>
                </RoleBase>
            </CardContent>
        </Card>
    );
};

export default AdminPage;