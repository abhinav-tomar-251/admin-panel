"use server";
import * as z from 'zod';
import { LoginSchema } from '@/schemas';

export const login = async (data: z.infer<typeof LoginSchema>) => {
   const validatedForm = LoginSchema.safeParse(data);
    if (!validatedForm.success) {
        return {error: "Invalid form data"};
    }

    return {success: "Logged in"};
}