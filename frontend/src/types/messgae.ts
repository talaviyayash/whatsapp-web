export type User = {
  _id: string;
  name: string;
  email: string;
};

export type Chat = {
  _id: string;
  isGroupChat: boolean;
  members: string[]; // Could be User[] if fully populated
  groupAdmins: string[]; // Same here
  createdAt: string; // or Date
  updatedAt: string; // or Date
  __v: number;
};

export type MessageType = {
  _id: string;
  sender: User;
  chat: Chat;
  content: string;
  messageType: "text" | "image" | "video" | "file"; // you can extend as needed
  fileUrl: string | null;
  readBy: string[]; // or User[] if populated
  createdAt: string; // or Date
  updatedAt: string; // or Date
  __v: number;
};
