import createMemeSlice from "./create-meme/createMemeSlice";
import memeOperationsSlice from "./memeOperations/memeOperations";

export const USER_LOGOUT = '@@logout/USER_LOGOUT'

import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authSlice from "./auth/authSlice";
import {setupListeners} from "@reduxjs/toolkit/query";
import {imgFlipApi} from "./queries/imgFlipApi";
import {dbApi} from "./queries/dbApi";

const combinedReducer = combineReducers({
  auth: authSlice,
  createMeme: createMemeSlice,
  currentMeme: memeOperationsSlice,
  [dbApi.reducerPath]: dbApi.reducer,
  [imgFlipApi.reducerPath]: imgFlipApi.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dbApi.middleware, imgFlipApi.middleware,)
})

setupListeners(store.dispatch)
