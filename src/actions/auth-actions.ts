"use server";

import { User } from "@prisma/client";
import prisma from "@/lib/prisma/client";
import { hashPassword } from "@/lib/bcrypt";
import { compileActivationTemplate, sendMail } from "@/lib/nodemailer";
import { signJwt, verifyJwt } from "@/lib/jwt";

export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image">
) {
  const result = await prisma.user.create({
    data: { ...user, password: await hashPassword(user.password) },
  });

  //generate encrypted User id to encrypt actual id
  const jwtUserId = signJwt({ id: result.id });

  // Create Email Activation Template using HandleBars before sending link for Account Activation
  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
  const body = compileActivationTemplate(user.firstName, activationUrl);

  await sendMail({
    to: user.email,
    subject: "Activate your account",
    body,
  });

  return result;
}

type ActivateUserFunc = (
  jwtUserId: string
) => Promise<"userNotExist" | "alreadyActivated" | "success">;

export const activateUser: ActivateUserFunc = async (jwtUserId) => {
  const payload = verifyJwt(jwtUserId);

  const userId = payload?.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return "userNotExist";

  if (user.emailVerified) return "alreadyActivated";

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  return "success";
};
