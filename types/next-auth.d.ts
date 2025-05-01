import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      avatar: string?;
    };
  }

  export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    createdAt: Date;
  }
}
