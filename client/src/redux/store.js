import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import courseReducer from "./courseSlice";
import commentReducer from "./commentSlice";
import postReducer from "./postSlice";
import commentPostReducer from "./commentPostSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  course: courseReducer,
  comment: commentReducer,
  post: postReducer,
  commentPost: commentPostReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
