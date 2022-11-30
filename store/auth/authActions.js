import {auth} from "../../config/firebase";

import { updateProfile } from "firebase/auth";
import API from "../../api";
import {setIsLoadedMemeImg, setMemeImages} from "../memeImg/memeImgActions";
import {setIsOpenMemeListModal} from "../create-meme/createMemeActions";
import apiDB from "../../apiDB";
export const SET_AUTH_USER = '@@auth/SET_AUTH_USER';
export const SET_AUTH_IS_LOADING = '@@auth/SET_AUTH_IS_LOADING';
export const SET_IS_OPEN_PERSONAL_DATA_MODAL = '@@auth/SET_IS_OPEN_PERSONAL_DATA_MODAL';
export const CHANGE_USER_DATA = '@@auth/CHANGE_USER_DATA';
export const GET_CURRENT_USER = '@@auth/GET_CURRENT_USER';
export const SET_TOKEN = '@@auth/SET_TOKEN';

export const setAuthUser = () => (dispatch) => {
  const user = auth.currentUser;
  if (user !== null) {

    const data = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL ? user.photoURL : '',
    }
    dispatch(getCurrentUser(data))

    auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      dispatch({type: SET_TOKEN, payload: idToken})
    }).catch(function(error) {
      console.log('TOKEN ERROR', error)
    });
  } else {
    dispatch(getCurrentUser(null))
  }
}

export const getCurrentUser = (data) => ({
  type: GET_CURRENT_USER,
  payload: data
})

export const setAuthIsLoading = (status) => ({
  type: SET_AUTH_IS_LOADING,
  payload: status,
})

export const setIsOpenUserPersonalDataModal = (status) => ({
  type: SET_IS_OPEN_PERSONAL_DATA_MODAL,
  payload: status
})

export const changeUserData = (data) => ({
  type: CHANGE_USER_DATA,
  payload: data
})

export const getCurrentUserData = (name) => (dispatch) => {
  updateProfile(auth.currentUser, {
    displayName: name,
  }).then(() => {
    dispatch(setIsOpenUserPersonalDataModal(false))
    dispatch(changeUserData(name))
    dispatch(addUserInDB())
  }).catch((error) => {
    console.log(error)
  });
}

export const addUserInDB = () => (dispatch, getState) => {
  const currentUser = getState().auth.user
  apiDB.post('users.json', {...currentUser, follow: '', favouriteMemes: ''}
  )
    .then(function (response) {
      console.log('Юзер зареганий', response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

