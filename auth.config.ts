import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { NextAuthConfig } from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from "./data/user";
import bcrypt from 'bcryptjs';

export default {
    providers: [
        Github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
       Credentials({
        async authorize(credentials) {
            const validatedForm = LoginSchema.safeParse(credentials);

            if (validatedForm.success) {
               const { email, password } = validatedForm.data;

               const user = await getUserByEmail(email);

               if(!user || !user.password) return null;

               const passwordsCheck = await bcrypt.compare(password, user.password);

                if (passwordsCheck) {
                     return user;
                } 
            }

            return null;
        }
       })
    ],
} satisfies NextAuthConfig;