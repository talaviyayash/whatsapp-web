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
  sender: string;
  chat: string;
  content: string;
  messageType: "text" | "image" | "video" | "file";
  fileUrl?: string | null;
  readBy: string[];
  createdAt: string;
  updatedAt: string;
  nanoId?: string;
  __v?: number;
};
