import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface ChatContextState {
  username: string;
  room: string;
}

// Define the initial state using that type
const initialState: ChatContextState = {
  username: "anonymous",
  room: "1",
};

export const chatContextSlice = createSlice({
  name: "chatContext",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },

    setRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload;
    },

    setChatContext: (state, action: PayloadAction<ChatContextState>) => {
      state = action.payload;
    },
  },
});

export const { setUsername, setRoom, setChatContext } =
  chatContextSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMessages = (state: RootState) => state.chatContext;

export default chatContextSlice.reducer;
