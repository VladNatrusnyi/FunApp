import {GET_MEMES_FOR_CURRENT_USER, GET_MY_MEMES} from "./memeActions";


const initialState = {
  myMemes: null,
  favouriteMemes: null,
  someUserMemes: null
}

export const memeReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_MY_MEMES:
      return {
        ...state,
        myMemes: payload,
      }
    case GET_MEMES_FOR_CURRENT_USER:
      return {
        ...state,
        someUserMemes: payload,
      }
    default:
      return state;
  }
}
