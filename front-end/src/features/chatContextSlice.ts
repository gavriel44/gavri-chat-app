import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Destination } from "../types";

// Define a type for the slice state
interface ChatContextState {
  username: string;
  room: string;
  destination: Destination;
}

// Define the initial state using that type
const initialState: ChatContextState = {
  username: "anonymous",
  room: "1",
  destination: "all",
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

    updateDestination: (state, action: PayloadAction<Destination>) => {
      state.destination = action.payload;
    },
  },
});

export const { setUsername, setRoom, updateDestination } =
  chatContextSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectChatContext = (state: RootState) => state.chatContext;

export default chatContextSlice.reducer;
