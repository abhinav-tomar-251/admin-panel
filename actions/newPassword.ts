"use server";
import * as z from 'zod';
import { NewPasswordSchema } from '@/schemas';
import { getPasswordResetTokenBYToken } from '@/data/passwordResetToken';
import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const newPassword = async (data: z.infer<typeof NewPasswordSchema>, token?: string | null ) => {
    if(!token) {
        return {
            error: "Token is required."
        }
    }

    const validatedForm = NewPasswordSchema.safeParse(data);
    if(!validatedForm.success) {
        return {
            error: "Invalid Fields."
        }
    }

    const { password} = validatedForm.data;

    const existingToken = await getPasswordResetTokenBYToken(token);

    if(!existingToken) {
        return {
            error: "Invalid Token."
        }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired) {
        return {
            error: "Token has expired."
        }
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser) {
        return {
            error: "User not found."
        }
    }

    

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword,
        }
    });

    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id
        }
    });

    return {
        success: "Password has been updated."
    }
};