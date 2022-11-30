export const selectMemesImg = (state) => {
  if (state.memeImg.memesImg) {
    return state.memeImg.memesImg.data.memes.filter(el => el.box_count === 2 ).map(item => {
      return {
        ...item,
        url: item.url.replace("\\", "")
      }
    })
  } else {
    return state.memeImg.memesImg
  }
}
