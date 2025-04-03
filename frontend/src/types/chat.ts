export type User = {
  _id: string;
  email: string;
  name?: string;
};

export type Chat = {
  _id: string;
  isGroupChat: boolean;
  members: {
    _id: string;
    email: string;
  }[];
  groupAdmins: {
    _id: string;
    email: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: User;
};

export type UserInfo = {
  _id: string;
  name: string;
  email: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
