"use server";

import * as z from "zod";

import { currentUser } from "@/lib/auth";
import { SettingSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";


export const settings = async ( data: z.infer<typeof SettingSchema> ) => {
    const user = await currentUser();

    if(!user){
        return { error: "Unauthorized"}
    }

    const dbUser = await getUserById(user.id as any);

    if(!dbUser){
        return { error: "User not found"}
    }

    await db.user.update({
        where: {
            id: user.id
        },
        data: {
            ...data
        }
    });

    return { success: "Settings Updated" }
}