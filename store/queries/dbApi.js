import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {clearCreatedMeme, clearMemeData, setIsOpenModal, setIsPublished} from "../create-meme/createMemeSlice";

const baseURL = `https://funapp-caaf5-default-rtdb.firebaseio.com/`


export const dbApi = createApi({
  reducerPath: 'dataBaseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers : {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }),

  tagTypes: ['dbData'],

  endpoints: builder => ({
//MEMES ENDPOINTS===========================================
    getMyMemes: builder.query({
      query: (myId) => ({
        url: `memes.json?orderBy="creatorId"&equalTo=${JSON.stringify(myId)}`
      }),
      transformResponse: response => ({
        myMemes: Object.keys(response).map(item => {
          return {
            id: item,
            ...response[item]
          }
        })
      }),
      providesTags: [{type: 'dbData', id: 'myMemes'}]
    }),

    getMemesForCurrentUser: builder.query({
      query: (userId) => ({
        url: `memes.json?orderBy="creatorId"&equalTo=${JSON.stringify(userId)}`
      }),
      transformResponse: response => ({
        someUserMemes: Object.keys(response).map(item => {
          return {
            id: item,
            ...response[item]
          }
        })
      }),
      providesTags: ['dbData']
    }),

    getCurrentMeme: builder.query({
      query: (id) => ({
        url: `memes/${id}.json?`
      }),
      transformResponse: (response) => ({
        memeData: response
      }),
      providesTags: (result, error, id) => [{ type: 'dbData', id }],
    }),

//USERS ENDPOINTS===========================================

    getUsers: builder.query({
      query: () => ({
        url: `users.json`
      }),
      transformResponse: (response) => ({
        users: Object.keys(response).map(item => {
          return {
            ...response[item]
          }
        })
      }),
      providesTags: ['dbData'],
    }),

    getCurrentUser: builder.query({
      query: (userId) => ({
        url: `users.json?orderBy="uid"&equalTo=${JSON.stringify(userId)}`
      }),
      transformResponse: (response) => ({
        user: Object.keys(response).map(item => {
          return response[item]
        })[0]
      }),
      providesTags: ['dbData'],
    }),




    publishMeme: builder.mutation({
      query: body => ({
        url: 'memes.json',
        method: 'POST',
        body
      }),
      invalidatesTags: [{type: 'dbData', id: 'myMemes'}],
      async onCacheEntryAdded(_,{dispatch, getState}) {
        dispatch(setIsPublished(true))

        setTimeout(() => {
          dispatch(setIsPublished(false))
          dispatch(clearMemeData())
          dispatch(clearCreatedMeme())
          dispatch(setIsOpenModal(false))
          // dispatch(getMyMemes())
        }, 2500)
      }
    }),


    deleteMeme: builder.mutation({
      query: memeId => ({
        url: `memes/${memeId}.json`,
        method: 'DELETE'
      }),
      invalidatesTags: [{type: 'dbData', id: 'myMemes'}],
    }),


    toggleLikesMeme: builder.mutation({
      query: ({body, id}) => ({
        url: `memes/${id}/likes.json`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (result, error, {id}) => [{ type: 'dbData', id }],
    }),

  })
})


export const {
  useGetMyMemesQuery,
  useGetMemesForCurrentUserQuery,
  useGetUsersQuery,
  useGetCurrentUserQuery,
  useGetCurrentMemeQuery,


  usePublishMemeMutation,
  useDeleteMemeMutation,
  useToggleLikesMemeMutation,
} = dbApi

