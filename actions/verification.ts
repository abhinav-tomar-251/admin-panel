"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { createVerificationTokenByToken } from "@/data/verificationToken";

export const newVerfication = async (token: string) => {
    const existingToken = await createVerificationTokenByToken(token);

    if (!existingToken) {
        return {
            error: "Invalid token"
        };
    }

    const hasExpired = new Date(existingToken.expiresAt) < new Date();

    if (hasExpired) {
        return {
            error: "Token has expired"
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {
            error: "User not found"
        };
    }

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    });

    return {
        success: "Email verified successfully"
    };
}