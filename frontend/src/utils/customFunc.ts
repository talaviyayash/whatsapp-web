import { DataState } from "@/redux/slice/dataSlice";
import { ModalState, toggleModal } from "@/redux/slice/modalSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { User } from "@/types/chat";

export const getApiData =
  <T>(name: string) =>
  (state: RootState): T | undefined =>
    state?.api?.[name] as T | undefined;

export const getUserInfo = () => (state: RootState) => state?.app?.userProfile;

type StateType = {
  modal: ModalState;
  data: DataState;
};

export const getModal =
  (name: string) =>
  (state: StateType): boolean =>
    state?.modal?.[name];

export const getOtherUser = (users: User[], currentId: string): User | null => {
  return users.find((user) => user._id !== currentId) || null;
};

export const getStateData = (name: string) => (state: StateType) =>
  state?.data?.[name];

export const getChatData = (id: string) => (state: StateType) =>
  state?.data?.chat?.[id];

export const modalToggle = ({
  dispatch,
  name,
}: {
  dispatch: AppDispatch;
  name: string;
}) => {
  dispatch(toggleModal({ name }));
};
