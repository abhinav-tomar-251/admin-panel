"use server";
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/token';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (data: z.infer<typeof RegisterSchema>) => {
   const validatedForm = RegisterSchema.safeParse(data);
    if (!validatedForm.success) {
        return {error: "Invalid form data"};
    }

    const { email, password, name } = validatedForm.data;
    const hashedPassword = await bcrypt.hash(password, 10);



    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {error: "User already exists"};
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,  
        }
    });


    // Send Verification Email

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    
    return {success: "Confirmation email sent. Please check your email to verify your account."};
}