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

export interface IUser {
  id: string;
  username: string;
  name: string;
  avatar: string | null;
}
export interface IFriendRequest {
  receiverId: string;
  senderId: string;
  sender: {
    name: string;
    username: string;
    avatar: string | null;
  };
  sentAt: string;
}
export interface IFriend {
  id: string;
  username: string;
  name: string;
  avatar: string | null;
}
