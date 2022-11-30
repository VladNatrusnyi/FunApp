import {SET_AUTH_IS_LOADING, SET_AUTH_USER} from "../auth/authActions";
import {SET_MEME_IMAGES, SET_MEME_IMG_IS_LOADING} from "./memeImgActions";

const initialState = {
  isLoadedMemeImg: false,
  memesImg: null
}

export const memeImgReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_MEME_IMAGES:
      return {
        ...state,
        memesImg: payload,
      }

    case SET_MEME_IMG_IS_LOADING:
      return {
        ...state,
        isLoadedMemeImg: payload,
      }
    default:
      return state;
  }
}
