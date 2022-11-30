import {combineReducers} from 'redux';

import {authReducer} from './auth/authReducer';
import {memeImgReducer} from "./memeImg/MemeImgReducer";
import {createMemeReducer} from "./create-meme/createMemeReducer";
import {memeReducer} from "./meme/memeReducer";
import {usersReducer} from "./users/usersReducer";

export const USER_LOGOUT = '@@logout/USER_LOGOUT'

export const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

const appReducer = combineReducers({
    auth: authReducer,
    memeImg: memeImgReducer,
    createMeme: createMemeReducer,
    memes:memeReducer,
    users: usersReducer
})
