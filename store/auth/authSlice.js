import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {auth} from "../../config/firebase";
import {updateProfile} from "firebase/auth";
import apiDB from "../../apiDB";
import {getDownloadURL, getStorage, ref, uploadBytes, deleteObject} from "firebase/storage";


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    isOpenUserPersonalDataModal: false,
    token: '',
    isLoadingChanges: false
  },
  reducers: {
    getCurrentUser(state, action) {
      state.user = action.payload
    },
    setAuthIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setIsOpenUserPersonalDataModal(state, action) {
      state.isOpenUserPersonalDataModal = action.payload
    },
    changeUserData(state, action) {
      state.user.displayName = action.payload.name
      state.user.photoURL = action.payload.imgUrl

      console.log('Changed data', state.user)
    },
    setToken(state, action) {
      state.token = action.payload
    },
    setAuthIsLoadingChanges(state, action) {
      state.isLoadingChanges = action.payload
    },
  },
})

export const getUser = createAsyncThunk(
    'auth/getUser',
    (_, {dispatch, getState}) => {
        if (getState().auth.user.displayName) {
            apiDB.get(`users.json?orderBy="uid"&equalTo=${JSON.stringify(getState().auth.user.uid)}`)
                .then(function (response) {
                    const data = Object.keys(response.data).map(item => response.data[item])
                    // console.log('Users DATA2', data);
                    console.log('Data for detCurrentUser1', data[0])
                    dispatch(getCurrentUser(data[0]))
                })
                .catch(function (error) {
                    console.log('Дані юзера у БД  НЕ Змінені',error);
                });
        }
    }
)

export const setAuthUser = createAsyncThunk(
  'auth/setAuthUser',
  (_, {dispatch, getState}) => {
    // dispatch(setAuthIsLoading(true))
    const user = auth.currentUser;
    if (user !== null) {
      if(user.displayName) {
        apiDB.get(`users.json?orderBy="uid"&equalTo=${JSON.stringify(user.uid)}`)
          .then(function (response) {
            const data = Object.keys(response.data).map(item => response.data[item])
            console.log('Users DATA1', data);
              console.log('Data for detCurrentUser2', data[0])
            dispatch(getCurrentUser(data[0]))
          })
          .catch(function (error) {
            console.log('Дані юзера у БД  НЕ Змінені',error);
          });
      } else {
        const data = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : '',
        }
          console.log('Data for detCurrentUser3', data)
        dispatch(getCurrentUser(data))
      }

      auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        dispatch(setToken())

        dispatch(setAuthIsLoading(false))
      }).catch(function(error) {
        console.log('TOKEN ERROR', error)
      });
    } else {
      dispatch(getCurrentUser(null))
        console.log('Data for detCurrentUser4', null)
      dispatch(setAuthIsLoading(false))
    }
  }
)

export const getCurrentUserData = createAsyncThunk(
  'auth/getCurrentUserData',
  ({name, imgUrl}, {dispatch, getState }) => {
    dispatch(setAuthIsLoadingChanges(true))
    console.log('Url перед update', imgUrl)
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imgUrl
    }).then(() => {
      dispatch(setIsOpenUserPersonalDataModal(false))
      dispatch(changeUserData({name, imgUrl}))
      dispatch(addUserInDB())
      dispatch(setAuthIsLoadingChanges(false))
    }).catch((error) => {
      console.log(error)
    });
  }
)

export const changeCurrentUserData = createAsyncThunk(
  'auth/changeCurrentUserData',
  ({name, imgUrl}, {dispatch, getState }) => {
    dispatch(setAuthIsLoadingChanges(true))
    console.log('Url перед update', imgUrl)
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imgUrl ? imgUrl : ''
    }).then(() => {
      dispatch(setIsOpenUserPersonalDataModal(false))
      dispatch(changeUserData({name, imgUrl}))
      dispatch(updateUserInDB({name, imgUrl}))
      dispatch(setAuthIsLoadingChanges(false))
    }).catch((error) => {
      console.log(error)
    });
  }
)

export const updateUserInDB = createAsyncThunk(
  'auth/updateUserInDB',
  ({name, imgUrl}, {dispatch, getState }) => {
    const currentUser = getState().auth.user

    console.log('Data for new user', currentUser)

    apiDB.patch(`users/${currentUser.dbId}.json`, JSON.stringify({photoURL: imgUrl, displayName: name}))
      .then(function (response) {
        console.log('Дані юзера у БД Змінені', response);
        apiDB.get(`users/${currentUser.dbId}.json`)
          .then(function (response) {
              console.log('Data for detCurrentUser6', response.data)
            dispatch(getCurrentUser(response.data))
          })
          .catch(function (error) {
            console.log('Дані юзера у БД  НЕ Змінені',error);
          });
      })
      .catch(function (error) {
        console.log('Дані юзера у БД  НЕ Змінені',error);
      });
  }
)


export const addUserInDB = createAsyncThunk(
  'auth/addUserInDB',
  (_, {dispatch, getState }) => {
    const currentUser = getState().auth.user;
    const user = auth.currentUser

    console.log('Data for new user', currentUser)

    apiDB.post('users.json', JSON.stringify({...currentUser, follow: '', favouriteMemes: ''})
    )
      .then(function (response) {
        console.log('Юзер зареганий', response.data.name);
        apiDB.patch(`users/${response.data.name}.json`, JSON.stringify({dbId: response.data.name}))
          .then(function (response) {
            console.log('dbId Додано до БД', response.data);
            apiDB.get(`users/${response.data.dbId}.json`)
              .then(function (response) {
                  console.log('Data for detCurrentUser7', response.data)
                dispatch(getCurrentUser(response.data))
              })
              .catch(function (error) {
                console.log('Дані юзера у БД  НЕ Змінені',error);
              });
          })
          .catch(function (error) {
            console.log('dbId НЕ Додано до БД',error);
          });
      })
      .catch(function (error) {
        console.log('Юзер не зареганий',error);
      });
  }
)




export const {
  getCurrentUser,
  setAuthIsLoading,
  setIsOpenUserPersonalDataModal,
  changeUserData,
  setToken,
  setAuthIsLoadingChanges
} = authSlice.actions

export default authSlice.reducer
