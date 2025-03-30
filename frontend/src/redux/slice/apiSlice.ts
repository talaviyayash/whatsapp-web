import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApiState {
  [key: string]: unknown;
}

const initialState: ApiState = {};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    addData: (
      state: ApiState,
      action: PayloadAction<{
        name: string;
        data: {
          [key: string]: unknown;
        };
      }>
    ) => {
      const { name, data } = action.payload;
      state[name] = data;
    },
    initialApiState: () => initialState,
  },
});

export const { addData, initialApiState } = apiSlice.actions;

export default apiSlice.reducer;
