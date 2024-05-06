
import { createVerificationTokenByEmail } from '@/data/verificationToken';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { getPasswordResetTokenBYEmail } from '@/data/passwordResetToken';


export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hours

    const existingToken = await getPasswordResetTokenBYEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hours

    const existingToken = await createVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },   
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expiresAt: expires,
        },
    });

    return verificationToken;
};