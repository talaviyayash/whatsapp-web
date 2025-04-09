import { MessageType } from "@/types/messgae";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DataState {
  chat: Record<string, unknown>;
  [key: string]: unknown; // Allows dynamic keys
}

const initialState: DataState = {
  chat: {},
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addPayloadData: (
      state,
      action: PayloadAction<{ name: string; data: unknown }>
    ) => {
      const { name, data } = action.payload;
      state[name] = data;
    },
    initialDataState: () => initialState,
    addMessage: (
      state,
      action: PayloadAction<{ name: string; data: MessageType[] }>
    ) => {
      const { name, data } = action.payload;
      (state.chat as Record<string, unknown>)[name] = [
        ...((state?.chat?.[name] as []) || []),
        ...data,
      ];
    },
    addNewMessage: (
      state,
      action: PayloadAction<{ name: string; data: MessageType }>
    ) => {
      const { name, data } = action.payload;
      const chatMessages =
        (state.chat as Record<string, MessageType[]>)[name] || [];

      const messageIndex = chatMessages.findIndex(
        (msg) => msg.nanoId && msg.nanoId === data.nanoId
      );

      if (messageIndex !== -1) {
        chatMessages[messageIndex] = data;
      } else {
        chatMessages.push(data);
      }
      (state.chat as Record<string, MessageType[]>)[name] = chatMessages;
    },
  },
});

export const { addPayloadData, initialDataState, addMessage, addNewMessage } =
  dataSlice.actions;

export default dataSlice.reducer;
