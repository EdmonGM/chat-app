import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      name: string;
      avatar: string?;
    };
  }

  export interface User {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
    createdAt: Date;
  }
}
