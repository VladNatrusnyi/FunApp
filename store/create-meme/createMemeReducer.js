import {
  CLEAR_CREATED_MEME_DATA,
  CLEAR_MEME_DATA,
  SET_CREATED_MEME,
  SET_CREATED_MEME_ERROR, SET_IS_OPEN_MEME_LIST_MODAL, SET_IS_OPEN_MODAL, SET_IS_PUBLISHED,
  SET_NEW_BOTTOM_MEME_TEXT,
  SET_NEW_MEME_IMG,
  SET_NEW_TOP_MEME_TEXT
} from "./createMemeActions";


const initialState = {
  newMemeData: {
    memeImg: '',
    memeTopText: '',
    memeBottomText: ''
  },
  error: null,
  createdMeme: null,
  isMemeCreated: false,
  isOpenModal: false,
  isOpenMemeListModal: false,
  isPublished: false
}

export const createMemeReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_NEW_TOP_MEME_TEXT:
      return {
        ...state,
        newMemeData: {
          ...state.newMemeData,
          memeTopText: payload
        },
      }
    case SET_NEW_BOTTOM_MEME_TEXT:
      return {
        ...state,
        newMemeData: {
          ...state.newMemeData,
          memeBottomText: payload
        },
      }
    case SET_NEW_MEME_IMG:
      return {
        ...state,
        newMemeData: {
          ...state.newMemeData,
          memeImg: payload
        },
      }
    case SET_CREATED_MEME:
      return {
        ...state,
        createdMeme: payload
      }
    case SET_CREATED_MEME_ERROR:
      return {
        ...state,
        error: payload
      }
    case SET_IS_OPEN_MODAL:
      return {
        ...state,
        isOpenModal: payload
      }
    case SET_IS_OPEN_MEME_LIST_MODAL:
      return {
        ...state,
        isOpenMemeListModal: payload
      }
    case CLEAR_MEME_DATA:
      return {
        ...state,
        newMemeData: {
          memeImg: '',
          memeTopText: '',
          memeBottomText: ''
        }
      }
    case CLEAR_CREATED_MEME_DATA:
      return {
        ...state,
        createdMeme: null
      }
    case SET_IS_PUBLISHED:
      return {
        ...state,
        isPublished: payload
      }

    default:
      return state;
  }
}
