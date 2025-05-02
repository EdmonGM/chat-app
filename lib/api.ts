import { IFriend, IFriendRequest, IUser } from "@/types/next-auth";
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

export const sendFriendRequest = async (
  senderId: string,
  receiverId: string
): Promise<void> =>
  await api.post(
    `/users/${senderId}/friends/requests/new?receiverId=${receiverId}`
  );

export const getFriendRequests = async (
  userId: string
): Promise<IFriendRequest[]> =>
  await api.get(`/users/${userId}/friends/requests/new`);

export const respondToFriendRequest = async (
  id: string,
  action: "accept" | "reject",
  senderId: string
): Promise<void> =>
  api.post(`/users/${id}/friends/requests`, {
    action: action,
    senderId: senderId,
  });

export const getAllFriends = async (id: string): Promise<IFriend[]> =>
  await api.get(`/users/${id}/friends`);
