import { IUser } from "@/types/next-auth";
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
  api.get(`/users/search?query=${encodeURIComponent(username)}`);

export const sendFriendRequest = async (
  senderId: string,
  receiverId: string
): Promise<void> =>
  api.post(`/users/${senderId}/friends/requests?receiverId=${receiverId}`);
