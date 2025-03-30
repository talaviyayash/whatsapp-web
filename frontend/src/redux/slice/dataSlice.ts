import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  [key: string]: unknown; // Allows dynamic keys
}

const initialState: DataState = {};

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
  },
});

export const { addPayloadData, initialDataState } = dataSlice.actions;

export default dataSlice.reducer;
