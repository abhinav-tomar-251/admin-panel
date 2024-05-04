"use server";
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';

export const register = async (data: z.infer<typeof RegisterSchema>) => {
   const validatedForm = RegisterSchema.safeParse(data);
    if (!validatedForm.success) {
        return {error: "Invalid form data"};
    }

    return {success: "Account created"};
}