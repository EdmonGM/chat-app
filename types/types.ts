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

export interface IChatMember {
  id: string;
  userId: string;
  user: IUser;
  chatId: string;
  chat: IChatRoom;
  joinedAt: Date;
}

export interface IChatRoom {
  id: string;
  name: string | null;
  members: IChatMember[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  chatId: string;
  chat: IChatRoom;
  senderId: string;
  sender: IUser;
}
