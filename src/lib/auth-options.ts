import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";

import prisma from "@/lib/prisma";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Your User Name",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password) {
          throw new Error("Please provide user name and password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.username,
          },
        });

        if (!user) {
          throw new Error("User name or password is not correct");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("User name or password is incorrect");
        }

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
      },
    }),
  ],
};
