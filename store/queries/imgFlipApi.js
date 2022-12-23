import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {clearCreatedMeme, clearMemeData, setIsOpenModal, setIsPublished} from "../create-meme/createMemeSlice";

const baseURL = `https://api.imgflip.com/`

const params = {
  username: 'VladNatrusnyi',
  password: '26012003',
  template_id: "112126428",
  boxes: [{"text": "aaaaa"},{"text": "rtg"},{"text": "ccccc"}]
}

export const imgFlipApi = createApi({
  reducerPath: 'imgFlipApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    headers : {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }),

  tagTypes: ['imgFlipData'],

  endpoints: builder => ({
    loadMemesImg: builder.query({
      query: () => ({
        url: `get_memes`
      }),
      transformResponse: (response) => ({
        // .filter(el => el.box_count === 2 )
        memesImg: response.data.memes.map(item => {
          return {
            ...item,
            url: item.url.replace("\\", "")
          }
        })
      }),
      providesTags: ['imgFlipData'],
      async onQueryStarted(_,{getState}) {

      }
    }),

  })
})

export const {
  useLoadMemesImgQuery
} = imgFlipApi
