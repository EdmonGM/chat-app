import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter Your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Your Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.email.split("@")[0],
              password: hashedPassword,
            },
          });
          return newUser;
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password!
        );

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.picture = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.email = token.email!;
        session.user.avatar = token.picture || null;

        // Remove image property if it exists
        if ("image" in session.user) {
          delete session.user.image;
        }
      }
      return session;
    },
  },
  // debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
