"use server";

import { User } from "@prisma/client";
import prisma from "@/lib/prisma/client";
import { hashPassword } from "@/lib/bcrypt";

export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image">
) {
  await prisma.user.create({
    data: { ...user, password: await hashPassword(user.password) },
  });
}
