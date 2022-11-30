import API, {baseParams} from "../../api";
import apiDB from "../../apiDB";
import {getMyMemes} from "../meme/memeActions";

export const SET_NEW_TOP_MEME_TEXT ='@@createMeme/SET_NEW_TOP_MEME_TEXT'
export const SET_NEW_BOTTOM_MEME_TEXT ='@@createMeme/SET_NEW_BOTTOM_MEME_TEXT'
export const SET_NEW_MEME_IMG ='@@createMeme/SET_NEW_MEME_IMG'
export const SET_CREATED_MEME ='@@createMeme/SET_CREATED_MEME'
export const SET_IS_CREATED_MEME ='@@createMeme/SET_IS_CREATED_MEME'
export const SET_CREATED_MEME_ERROR ='@@createMeme/SET_CREATED_MEME_ERROR'
export const SET_IS_OPEN_MODAL ='@@createMeme/SET_IS_OPEN_MODAL'
export const CLEAR_MEME_DATA ='@@createMeme/CLEAR_MEME_DATA'
export const SET_IS_OPEN_MEME_LIST_MODAL ='@@createMeme/SET_IS_OPEN_MEME_LIST_MODAL'
export const CLEAR_CREATED_MEME_DATA ='@@createMeme/CLEAR_CREATED_MEME_DATA'
export const SET_IS_PUBLISHED ='@@createMeme/SET_IS_PUBLISHED'


export const setCreatedMemError = (data) => ({
  type: SET_CREATED_MEME_ERROR,
  payload: data
})

export const setIsOpenModal = (data) => ({
  type: SET_IS_OPEN_MODAL,
  payload: data
})

export const setIsOpenMemeListModal = (data) => ({
  type: SET_IS_OPEN_MEME_LIST_MODAL,
  payload: data
})

export const setNewMemeText = (position, text) => {
  switch (position) {
    case 'top':
      return {
        type: SET_NEW_TOP_MEME_TEXT,
        payload: text,
      }
    case 'bottom':
      return {
        type: SET_NEW_BOTTOM_MEME_TEXT,
        payload: text,
      }
  }
}

export const setMemeImg = (data) => ({
    type: SET_NEW_MEME_IMG,
    payload: data
})

export const setIsCreatedMeme = (status) => ({
  type: SET_IS_CREATED_MEME,
  payload: status,
})

export const createNewMeme = () => (dispatch, getState) => {
  dispatch(setIsCreatedMeme(true))

  const newMemeData = getState().createMeme.newMemeData
  API.post('caption_image',
    {
      ...baseParams,
      template_id: newMemeData.memeImg.memeId,
      text0: newMemeData.memeTopText,
      text1: newMemeData.memeBottomText,
    })
    .then(res => {
      const createdMeme = res.data;
      console.log('Create Mem', createdMeme)
      if (createdMeme.success) {
        dispatch(setCreatedMeme(createdMeme.data))
        dispatch(setIsCreatedMeme(false))
        dispatch(setCreatedMemError(null))
        dispatch(setIsOpenModal(true))
      }
    })
    .catch(function (error) {
      dispatch(setCreatedMemError('Виникли проблеми зі створенням мему.Будь ласка спробуйте ще раз'))
      console.log(error);
    })
}

export const setCreatedMeme = (data) => ({
  type: SET_CREATED_MEME,
  payload: data
})

export const clearMemeData = () => ({
  type: CLEAR_MEME_DATA
})

export const clearCreatedMeme = () => ({
  type: CLEAR_CREATED_MEME_DATA
})

export const publicMeme = () => (dispatch, getState) => {
  const newMemeLink = getState().createMeme.createdMeme
  const creator = getState().auth.user.uid
  apiDB.post('memes.json', {
    url: newMemeLink,
    creatorId: creator,
    date: new Date(),
    likes: 0
  }
  )
    .then(function (response) {
      console.log('Meme added to DB', response);
      dispatch(setIsPublished(true))

      setTimeout(() => {
        dispatch(setIsPublished(false))
        dispatch(clearMemeData())
        dispatch(clearCreatedMeme())
        dispatch(setIsOpenModal(false))
        dispatch(getMyMemes())
      }, 2000)

    })
    .catch(function (error) {
      console.log(error);
    });
}

export const setIsPublished = (data) => ({
  type: SET_IS_PUBLISHED,
  payload: data
})



