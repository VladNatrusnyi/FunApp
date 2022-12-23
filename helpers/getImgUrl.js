import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";


export const getImgUrl = async (file, userId) => {
  let result = null

  const storage = getStorage();
  const storageRef = ref(storage, userId);

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", file.assets[0].uri, true);
    xhr.send(null);
  });


  await uploadBytes(storageRef, blob).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    result = downLoad(userId)
  });

  await blob.close();

  return result ? result : false
}

const downLoad = (userId) => {
  const storage = getStorage();
  const starsRef = ref(storage, userId);

// Get the download URL
  return getDownloadURL(starsRef)
    .then((url) => {
      console.log('IMG URL LOADED', url)
      return url
    })
    .catch((error) => {
      switch (error.code) {
        case 'storage/object-not-found':
          console.log('File doesn\'t exist')
          // File doesn't exist
          break;
        case 'storage/unauthorized':
          console.log('User doesn\'t have permission to access the object')
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          console.log('User canceled the upload')
          // User canceled the upload
          break;
        case 'storage/unknown':
          console.log('Unknown error occurred, inspect the server response')
          // Unknown error occurred, inspect the server response
          break;
      }
    });
}
