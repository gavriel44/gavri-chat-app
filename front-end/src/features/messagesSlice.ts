import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ReceivableMessage } from "../types";

// Define a type for the slice state
type MessagesState = ReceivableMessage[];

// Define the initial state using that type
const initialState: MessagesState = [];

export const messagesSlice = createSlice({
  name: "messages",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<ReceivableMessage | ReceivableMessage[]>
    ) => {
      return state.concat(action.payload);
    },
    updateMessageStatus: (
      state,
      action: PayloadAction<{ status: boolean; id: string }>
    ) => {
      state.forEach((message) => {
        if (
          message.type !== "EnterRoomMessage" &&
          message.id === action.payload.id
        ) {
          message.received = action.payload.status;
        }
      });
    },
  },
});

export const { addMessage, updateMessageStatus } = messagesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMessages = (state: RootState) => state.messages;

export default messagesSlice.reducer;
