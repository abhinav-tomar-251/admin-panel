import { db } from "@/lib/db";

export const getPasswordResetTokenBYToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
        where: {
            token,
        },
    });
    return passwordResetToken;
  } catch  {
    return null;
  }
};

export const getPasswordResetTokenBYEmail= async (email: string) => {
    try {
      const passwordResetToken = await db.passwordResetToken.findFirst({
          where: {
              email,
          },
      });
      return passwordResetToken;
    } catch  {
      return null;
    }
  };