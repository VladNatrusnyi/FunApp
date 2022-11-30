import {GET_MY_MEMES} from "../meme/memeActions";
import {GET_MEMES_FOR_CURRENT_USER, GET_USERS, SET_USERS_LOADED} from "./usersActions";

const initialState = {
  users: null,
  usersLoaded: false
}

export const usersReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      }
    case SET_USERS_LOADED:
      return {
        ...state,
        usersLoaded: payload,
      }
    default:
      return state;
  }
}
