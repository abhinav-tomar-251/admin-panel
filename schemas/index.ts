import { currentRole } from '@/lib/auth';
import * as z from 'zod';


export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required.'
    }),
    password: z.string().min(1, {
        message: 'Password is required.'
    }),
});

export const ResetPasswordSchema = z.object({
    email: z.string().email({
        message: 'Email is required.'
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(8, {
        message: 'Minimum 8 characters required.'
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is required.'
    }),
    password: z.string().min(8, {
        message: 'Minimum 8 characters required.'
    }),
    name: z.string().min(1, {
        message: 'Name is required.'
    }),
});


export const SettingSchema = z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    image: z.optional(z.string().url()),
})


