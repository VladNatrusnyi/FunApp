import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import API, {baseParams} from "../../api";

const createMemeSlice = createSlice({
  name: 'createMeme',
  initialState: {
    memeImg: '',
    isOpenMemeListModal: false,
    error: null,
    createdMeme: null,
    isMemeCreating: false,
    isOpenModal: false,
    isPublished: false
  },
  reducers: {
    setMemeImg(state, action) {
      state.memeImg = action.payload
    },
    setIsOpenMemeListModal(state, action) {
      state.isOpenMemeListModal = action.payload
    },
    setCreatedMemError(state, action) {
      state.error = action.payload
    },
    setCreatedMeme(state, action) {
      state.createdMeme = action.payload
    },
    setIsCreatedMeme(state, action) {
      state.isMemeCreating = action.payload
    },
    setIsOpenModal(state, action) {
      state.isOpenModal = action.payload
    },
    setIsPublished(state, action) {
      state.isPublished = action.payload
    },
    clearCreatedMeme(state, action) {
      state.createdMeme = null
    },
    clearMemeData(state, action) {
      state.memeImg = ''
    },
  },
})

export const {
  setMemeImg,
  setIsOpenMemeListModal,
  setCreatedMemError,
  setCreatedMeme,
  setIsCreatedMeme,
  setIsOpenModal,
  setIsPublished,
  clearCreatedMeme,
  clearMemeData
} = createMemeSlice.actions

export default createMemeSlice.reducer

export const createMeme = createAsyncThunk(
  'meme/createNewMeme',
  (data, {dispatch, getState }) => {
    dispatch(setIsCreatedMeme(true))
    API.post('caption_image',
      {
        ...baseParams,
        ...data
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
        console.log('Create Meme Error',error);
      })
  }
)
