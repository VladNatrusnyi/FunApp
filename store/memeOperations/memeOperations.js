import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import API, {baseParams} from "../../api";
import apiDB from "../../apiDB";
import {useToggleFavouriteMemeMutation} from "../queries/dbApi";
import {getCurrentUser, getUser} from "../auth/authSlice";

const memeOperationsSlice = createSlice({
    name: 'currentMeme',
    initialState: {
        usersWhoLiked: [],
        usersThatFollow: [],
        usersThatFollowMe: [],
        favouriteMeme: [],
        isLoad: false
    },
    reducers: {
        setUsersWhoLiked(state, action) {
            state.usersWhoLiked.push(action.payload)
        },
        clearUsersWhoLiked(state, action) {
            state.usersWhoLiked = action.payload
        },

        setUsersThatFollow(state, action) {
            state.usersThatFollow.push(action.payload)
        },
        clearUsersThatFollow(state, action) {
            state.usersThatFollow = action.payload
        },

        setUsersThatFollowMe(state, action) {
            state.usersThatFollowMe.push(action.payload)
        },
        clearUsersThatFollowMe(state, action) {
            state.usersThatFollowMe = action.payload
        },

        setFavouriteMeme(state, action) {
            state.favouriteMeme.push(action.payload)
        },
        clearFavouriteMeme(state, action) {
            state.favouriteMeme = action.payload
        },

        setIsLoad(state, action) {
            state.isLoad = action.payload
        },
    },
})

export const {
    setUsersWhoLiked,
    setIsLoad,
    clearUsersWhoLiked,

    setUsersThatFollow,
    clearUsersThatFollow,

    setUsersThatFollowMe,
    clearUsersThatFollowMe,

    setFavouriteMeme,
    clearFavouriteMeme

} = memeOperationsSlice.actions

export default memeOperationsSlice.reducer

export const getUsersWhoLiked = createAsyncThunk(
    'currentMeme/getUsersWhoLiked',
    async (usersArr, {dispatch, getState }) => {
        dispatch(clearUsersWhoLiked([]))
        dispatch(setIsLoad(true))
            await usersArr.forEach((item) => {
            apiDB.get(`users.json?orderBy="uid"&equalTo=${JSON.stringify(item)}`)
                .then(function (response) {
                    const data = Object.keys(response.data).map(item => response.data[item])
                    dispatch(setUsersWhoLiked(data[0]))
                })
                .catch(function (error) {
                    console.log('Дані юзера у БД  НЕ Змінені',error);
                });
        })

        dispatch(setIsLoad(false))

    }
)

export const getUsersThatFollow = createAsyncThunk(
    'currentMeme/getUsersThatFollow',
    async (usersArr, {dispatch, getState }) => {
        dispatch(clearUsersThatFollow([]))
        dispatch(setIsLoad(true))
        await usersArr.forEach((item) => {
            apiDB.get(`users.json?orderBy="uid"&equalTo=${JSON.stringify(item)}`)
                .then(function (response) {
                    const data = Object.keys(response.data).map(item => response.data[item])
                    dispatch(setUsersThatFollow(data[0]))
                })
                .catch(function (error) {
                    console.log('Дані юзера у БД  НЕ Змінені',error);
                });
        })

        dispatch(setIsLoad(false))

    }
)

export const getUsersThatFollowMe = createAsyncThunk(
    'currentMeme/getUsersThatFollow',
    async (usersArr, {dispatch, getState }) => {
        dispatch(clearUsersThatFollowMe([]))
        dispatch(setIsLoad(true))
        await usersArr.forEach((item) => {
            apiDB.get(`users.json?orderBy="uid"&equalTo=${JSON.stringify(item)}`)
                .then(function (response) {
                    const data = Object.keys(response.data).map(item => response.data[item])
                    dispatch(setUsersThatFollowMe(data[0]))
                })
                .catch(function (error) {
                    console.log('Дані юзера у БД  НЕ Змінені',error.name);
                })
            ;
        })

        dispatch(setIsLoad(false))

    }
)



export const getFavouriteMeme = createAsyncThunk(
    'currentMeme/getFavouriteMeme',
    async (memeArr, {dispatch, getState }) => {
        console.log('Getting favourite meme USER at thre moment', getState().auth.user)
        dispatch(clearFavouriteMeme([]))
        dispatch(setIsLoad(true))
        await memeArr && memeArr.forEach((item) => {
            apiDB.get(`memes/${item}.json`)
                .then(function (response) {
                    dispatch(setFavouriteMeme({...response.data, id: item}))
                })
                .catch(function (error) {
                    console.log('Дані юзера у БД  НЕ Змінені',error);
                });
        })

        dispatch(setIsLoad(false))
    }
)


//
export const deleteDataAfterDeletingMeme = createAsyncThunk(
    'currentMeme/deleteDataAfterDeletingMeme',
    async (memeId, {dispatch, getState }) => {

        console.log('Afterdeleting визваний', memeId);

        apiDB.get(`users.json`)
            .then(function (response) {
                const data = Object.keys(response.data).map(item => response.data[item])
                console.log('Afterdeleting дата ', data);
                data.forEach(item => {
                    if (item.favouriteMemes && item.favouriteMemes.includes(memeId)) {
                        console.log('Afterdeleting найшов співпадіння');

                        apiDB.put(`users/${item.dbId}/favouriteMemes.json`, JSON.stringify(item.favouriteMemes.filter(item => item !== memeId)))
                            .then(function (response) {
                                console.log('Апдейтнулось', response);
                                if (item.uid === getState().auth.user.uid) {
                                    dispatch(getUser())
                                }
                            })
                            .catch(function (error) {
                                console.log('Не Апдейтнулось',error);
                            });
                    }
                })

            })
            .catch(function (error) {
                console.log('Зачистка' ,error.name);
            })
    }
)