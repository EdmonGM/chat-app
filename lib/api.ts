import { IChatRoom, IFriend, IFriendRequest, IUser } from "@/types/types";
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || "Request failed";
    console.error("API Error:", message);
    throw new Error(message);
  }
);

export const searchUsers = async (username: string): Promise<IUser[]> =>
  await api.get(`/users/search?query=${encodeURIComponent(username)}`);

export const sendFriendRequest = async (receiverId: string): Promise<void> =>
  await api.post(`/users/friends/requests/new?receiverId=${receiverId}`);

export const getFriendRequests = async (): Promise<IFriendRequest[]> =>
  await api.get(`/users/friends/requests/new`);

export const respondToFriendRequest = async (
  action: "accept" | "reject",
  senderId: string
): Promise<void> =>
  api.post(`/users/friends/requests`, {
    action: action,
    senderId: senderId,
  });

export const getAllFriends = async (): Promise<IFriend[]> =>
  await api.get(`/users/friends`);

export const getUserChats = async (): Promise<IChatRoom[]> =>
  await api.get("/chat");

export const createChatRoom = async (
  secondUserId: string
): Promise<IChatRoom> =>
  await api.post("/chat", { secondUserId: secondUserId });
