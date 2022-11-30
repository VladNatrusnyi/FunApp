

// export const async downloadImage = () => {
//   const downloadResumable = FileSystem.createDownloadResumable(
//     'http://techslides.com/demos/sample-videos/small.mp4',
//     FileSystem.documentDirectory + 'small.mp4',
//     {},
//     callback
//   );
//
//   try {
//     const { uri } = await downloadResumable.downloadAsync();
//     console.log('Finished downloading to ', uri);
//   } catch (e) {
//     console.error(e);
//   }
// }
