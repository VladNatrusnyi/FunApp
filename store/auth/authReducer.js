import {
  CHANGE_USER_DATA,
  GET_CURRENT_USER,
  SET_AUTH_IS_LOADING,
  SET_AUTH_USER,
  SET_IS_OPEN_PERSONAL_DATA_MODAL, SET_TOKEN
} from "./authActions";

const initialState = {
  user: null,
  isLoading: false,
  isOpenUserPersonalDataModal: false,
  token: ''
}

export const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        user: payload
      }

    case SET_AUTH_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    case SET_IS_OPEN_PERSONAL_DATA_MODAL:
      return {
        ...state,
        isOpenUserPersonalDataModal: payload
      }
    case CHANGE_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          displayName: payload
        }
      }
    case SET_TOKEN:
      return {
        ...state,
        token: payload
      }
    default:
      return state;
  }
}
