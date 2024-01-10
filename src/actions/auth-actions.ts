"use server";

import { User } from "@prisma/client";
import prisma from "@/lib/prisma/client";
import { hashPassword } from "@/lib/bcrypt";
import { sendMail } from "@/lib/nodemailer";
import { signJwt, verifyJwt } from "@/lib/jwt";
import { compileTemplate } from "@/lib/handlebars";
import { activationTemplate } from "@/lib/email-templates/activation";
import { resetPasswordTemplate } from "@/lib/email-templates/reset-pasword";
import { Result } from "postcss";

type RegisterUserFunc = (
  user: Omit<User, "id" | "emailVerified" | "image">
) => Promise<User>;

export const registerUser: RegisterUserFunc = async (user) => {
  const result = await prisma.user.create({
    data: { ...user, password: await hashPassword(user.password) },
  });

  //generate encrypted User id to encrypt actual id
  const jwtUserId = signJwt({ id: result.id });

  // Create Email Activation Template using HandleBars before sending link for Account Activation
  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
  const body = compileTemplate(
    user.firstName,
    activationUrl,
    activationTemplate as string
  );

  await sendMail({
    to: user.email,
    subject: "Activate your account",
    body,
  });

  return result;
};

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

export const forgotPassword = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new Error("The user does not exist");

  // Send email with Password Reset link
  const jwtUserId = signJwt({ id: user.id });

  // Create Password Reset Email Template using HandleBars before sending link to Reset Password
  const resetPasswordUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${jwtUserId}`;
  const body = compileTemplate(
    user.firstName,
    resetPasswordUrl,
    resetPasswordTemplate as string
  );

  await sendMail({
    to: user.email,
    subject: "Reset your password",
    body,
  });
};

type ResetPasswordFunc = (
  jwtUserId: string,
  password: string
) => Promise<"userNotExist" | "success">;

export const resetPassword: ResetPasswordFunc = async (jwtUserId, password) => {
  const payload = verifyJwt(jwtUserId);

  if (!payload) return "userNotExist";

  const userId = payload.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return "userNotExist";

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: await hashPassword(password),
    },
  });

  if (result) return "success";
  else throw new Error("Something went wrong");
};
