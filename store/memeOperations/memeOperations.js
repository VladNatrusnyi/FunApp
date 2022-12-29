import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import API, {baseParams} from "../../api";
import apiDB from "../../apiDB";

const memeOperationsSlice = createSlice({
    name: 'currentMeme',
    initialState: {
        usersWhoLiked: [],
        isLoad: false
    },
    reducers: {
        setUsersWhoLiked(state, action) {
            state.usersWhoLiked.push(action.payload)
        },
        clearUsersWhoLiked(state, action) {
            state.usersWhoLiked = action.payload
        },
        setIsLoad(state, action) {
            state.isLoad = action.payload
        },
    },
})

export const {
    setUsersWhoLiked,
    setIsLoad,
    clearUsersWhoLiked
} = memeOperationsSlice.actions

export default memeOperationsSlice.reducer

export const getUsersWhoLiked = createAsyncThunk(
    'currentMeme/createNewMeme',
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