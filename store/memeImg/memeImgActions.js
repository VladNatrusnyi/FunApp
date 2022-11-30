import API from "../../api";

export const SET_MEME_IMG_IS_LOADING = '@@memeImg/SET_MEME_IMG_IS_LOADING'
export const SET_MEME_IMAGES = '@@memeImg/SET_MEME_IMAGES'


export const setIsLoadedMemeImg = (status) => ({
  type: SET_MEME_IMG_IS_LOADING,
  payload: status,
})

export const setMemeImages = (data) => ({
  type: SET_MEME_IMAGES,
  payload: data,
})

export const loadMemesImg = () => (dispatch, getState) => {
  if (!getState().memeImg.memesImg){
    dispatch(setIsLoadedMemeImg(false))

    API.get(`get_memes`)
      .then(res => {
        const apiImages = res.data;
        console.log(apiImages)
        if (apiImages.success) {
          dispatch(setMemeImages(apiImages))
          dispatch(setIsLoadedMemeImg(true))
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}
