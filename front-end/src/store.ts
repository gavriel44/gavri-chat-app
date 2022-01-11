import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./features/messagesSlice";
import chatContextReducer from "./features/chatContextSlice";
import connectedUsersReducer from "./features/connectedUsersSlice";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    chatContext: chatContextReducer,
    connectedUsers: connectedUsersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
