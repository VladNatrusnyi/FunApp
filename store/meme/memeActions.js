import API from "../../api";
import apiDB from "../../apiDB";
export const GET_MEMES_FOR_CURRENT_USER = '@@users/GET_MEMES_FOR_CURRENT_USER'

export const GET_MY_MEMES = '@@meme/GET_MY_MEMES'

// export const setIsLoadedMemeImg = (status) => ({
//   type: SET_MEME_IMG_IS_LOADING,
//   payload: status,
// })

export const getMyMemes = () => (dispatch, getState) => {
  const currentUserId = getState().auth.user.uid
  console.log('currentUserId', currentUserId);

  apiDB.get(`memes.json?orderBy="creatorId"&equalTo=${JSON.stringify(currentUserId)}`)
    .then(res => {
      const apiImages = res.data;
      console.log('My MEMES', apiImages)

      const data = Object.keys(apiImages).map(item => {
        return {
          id: item,
          ...apiImages[item]
        }
      })

      console.log('My MEMES CHANGED', data)
      dispatch({
        type: GET_MY_MEMES,
        payload: data
      })
    })
    .catch(function (error) {
      console.log(error);
    })
}


export const getMemesForCurrentUser = (userId) => (dispatch, getState) => {

  apiDB.get(`memes.json?orderBy="creatorId"&equalTo=${JSON.stringify(userId)}`)
    .then(res => {
      const apiImages = res.data;

      const data = Object.keys(apiImages).map(item => {
        return {
          id: item,
          ...apiImages[item]
        }
      })

      console.log('My MEMES CHANGED', data)
      dispatch({
        type: GET_MEMES_FOR_CURRENT_USER,
        payload: data
      })
    })
    .catch(function (error) {
      console.log(error);
    })
}

export const addToFavourite = () => {

}

// export const getMyFavouriteMemes = () => (dispatch, getState) => {
//   const currentUserId = getState().auth.user.uid
//   console.log('currentUserId', currentUserId);
//
//   apiDB.get(`memes.json?orderBy="creatorId"&equalTo=${JSON.stringify(currentUserId)}`)
//     .then(res => {
//       const apiImages = res.data;
//       console.log('My MEMES', apiImages)
//       // if (apiImages.success) {
//       //   dispatch(setMemeImages(apiImages))
//       //   dispatch(setIsLoadedMemeImg(true))
//       // }
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
// }
