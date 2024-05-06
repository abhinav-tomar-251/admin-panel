"use server";

import * as z from 'zod';
import { ResetPasswordSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/token';


export const resetPassword = async (data: z.infer<typeof ResetPasswordSchema>) => {
    const validateForm = ResetPasswordSchema.safeParse(data);
    if (!validateForm.success) {
        return { error: "Invalid email" };
    }

    const { email } = validateForm.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return { error: "User not found" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: "Password reset email sent" };
}