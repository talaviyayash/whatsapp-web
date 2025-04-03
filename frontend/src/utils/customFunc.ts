import { RootState } from "@/redux/store";
import { User } from "@/types/chat";

export const getApiData =
  <T>(name: string) =>
  (state: RootState): T | undefined =>
    state?.api?.[name] as T | undefined;

export const getUserInfo = () => (state: RootState) => state?.app?.userProfile;

export const getOtherUser = (users: User[], currentId: string): User | null => {
  console.log("currentId", currentId);
  return users.find((user) => user._id !== currentId) || null;
};
