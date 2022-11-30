import apiDB from "../../apiDB";
import {GET_MY_MEMES} from "../meme/memeActions";
export const GET_USERS = '@@users/GET_USERS'
export const SET_USERS_LOADED = '@@users/SET_USERS_LOADED'


export const setUsersLoaded = (data) => ({
  type: SET_USERS_LOADED,
  payload: data
})



export const getUsers = () => (dispatch, getState) => {
  const currentUserId = getState().auth.user.uid
  console.log('currentUserId', currentUserId);

  dispatch(setUsersLoaded(true))

  apiDB.get(`users.json`)
    .then(res => {
      const users = res.data;

      const data = Object.keys(users).map(item => {
        return {
          ...users[item]
        }
      }).filter(el => el.uid !== currentUserId)

      dispatch({
        type: GET_USERS,
        payload: data
      })

      dispatch(setUsersLoaded(false))
    })
    .catch(function (error) {
      console.log(error);
    })
}


