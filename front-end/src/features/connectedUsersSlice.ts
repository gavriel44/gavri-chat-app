import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Room } from "../types";

// Define a type for the slice state
type ConnectedUsersState = Room;

// Define the initial state using that type
const initialState: ConnectedUsersState = [];

export const connectedUsersSlice = createSlice({
  name: "connectedUsers",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setConnectedUsers: (state, action: PayloadAction<ConnectedUsersState>) => {
      return [...action.payload];
    },
  },
});

export const { setConnectedUsers } = connectedUsersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectConnectedUsers = (state: RootState) => state.connectedUsers;

export default connectedUsersSlice.reducer;
