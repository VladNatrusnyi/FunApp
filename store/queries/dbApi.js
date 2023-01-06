import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {clearCreatedMeme, clearMemeData, setIsOpenModal, setIsPublished} from "../create-meme/createMemeSlice";
import {getUser, setAuthUser} from "../auth/authSlice";
import {deleteDataAfterDeletingMeme, getFavouriteMeme} from "../memeOperations/memeOperations";

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
      providesTags: [{type: 'dbData', id: 'myMemes'}, {type: 'dbData', id: 'memeDelete'}]
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
        providesTags: (result, error, id) => [{ type: 'dbData', id },
          { type: 'dbData', id: `Favourite${id}` }],
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
      providesTags: ['dbData']
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
      providesTags: (result, error, userId) => [{ type: 'dbData', id: `User` }],
    }),

 // Comments Endpoints

    getCommentsForCurrentMeme: builder.query({
      query: (memeId) => ({
        url: `comments.json?orderBy="memeId"&equalTo=${JSON.stringify(memeId)}`
      }),
      transformResponse: response => ({
        commentsForCurrentMeme: Object.keys(response).map(item => {
          return {
            id: item,
            ...response[item]
          }
        }).sort((a, b) => new Date(b.date) - new Date(a.date))
      }),
      providesTags: (result, error, memeId) => [{type: 'dbData', id: `Comments`}]
    }),



    //Мутації мемів
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
      async onCacheEntryAdded(
          arg,
          {
            dispatch,
            getState,
          }
      ) {
        await dispatch(deleteDataAfterDeletingMeme(arg))
      },
      invalidatesTags: [{type: 'dbData', id: 'memeDelete'}],
    }),


    toggleLikesMeme: builder.mutation({
      query: ({body, id}) => ({
        url: `memes/${id}/likes.json`,
        method: 'PUT',
        body
      }),
      invalidatesTags: (result, error, {id}) => [{ type: 'dbData', id }],
    }),

    toggleSubscribeUser: builder.mutation({
      query: ({body, id}) => ({
        url: `users/${id}/follow.json`,
        method: 'PUT',
        body
      }),
      // invalidatesTags: (result, error, {id}) => [{ type: 'dbData', id: `User:${id}` }],
    }),

    toggleFollowMe: builder.mutation({
      query: ({body, id}) => ({
        url: `users/${id}/followMe.json`,
        method: 'PUT',
        body
      }),
      transformResponse: (response) => ({
        followMeData: response
      }),
      invalidatesTags: (result, error, {id}) => [{ type: 'dbData', id: `User` }],
    }),

    toggleFavouriteMeme: builder.mutation({
      query: ({body, uid, memeId}) => ({
        url: `users/${uid}/favouriteMemes.json`,
        method: 'PUT',
        body
      }),
      transformResponse: (response) => ({
        favouriteMemeData: response
      }),
      async onCacheEntryAdded(
          arg,
          {
            dispatch,
            getState,
          }
      ) {
        // await dispatch(getFavouriteMeme(JSON.stringify(arg.body)))
      },
      invalidatesTags: (result, error, {memeId}) => [{ type: 'dbData', id: `Favourite${memeId}` }],
    }),

    publishComment: builder.mutation({
      query: body => ({
        url: 'comments.json',
        method: 'POST',
        body
      }),
      invalidatesTags: (result, error, body) => [{type: 'dbData', id: `Comments`}],
    }),

  })
})


export const {
  useGetMyMemesQuery,
  useGetMemesForCurrentUserQuery,
  useGetUsersQuery,
  useGetCurrentUserQuery,
  useGetCurrentMemeQuery,
  useGetCommentsForCurrentMemeQuery,




  usePublishMemeMutation,
  useDeleteMemeMutation,
  useToggleLikesMemeMutation,
  useToggleSubscribeUserMutation,
  useToggleFollowMeMutation,
  useToggleFavouriteMemeMutation,
  usePublishCommentMutation,
} = dbApi

