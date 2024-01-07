import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/lib/prisma/client";
import { comparePassword } from "@/lib/bcrypt";
import { User } from "@prisma/client";

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

        const isPasswordCorrect = await comparePassword(
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
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};
