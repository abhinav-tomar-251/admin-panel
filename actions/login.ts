"use server";
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { generateVerificationToken } from '@/lib/token';
import { getUserByEmail } from '@/data/user';
import { sendVerificationEmail } from '@/lib/mail';

export const login = async (data: z.infer<typeof LoginSchema>) => {
   const validatedForm = LoginSchema.safeParse(data);
    if (!validatedForm.success) {
        return {error: "Invalid form data"};
    }

    const { email, password } = validatedForm.data;  

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "User does not exist"};
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
    
        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return {success: "Confirmation email sent. Please check your email to verify your account."}
    };

    
    
    try {
        await signIn('credentials',{email, password, redirectTo: DEFAULT_LOGIN_REDIRECT})
    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error: "Invalid credentials"};
                default:
                    return {error: "An error occurred"};
            }
        }
        throw error;
    }
}