// import {useState} from "react";
// import * as ImagePicker from 'expo-image-picker';
// import {Button, Image, View} from "react-native";
// import { getStorage, ref, uploadString, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import {convertToBlob} from "../helpers/getImgUrl";
//
//
// export default function PhotoPicker() {
//   const [image, setImage] = useState(null);
//   const [image2, setImage2] = useState(null);
//   const [file, setFile] = useState(null);
//
//
//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//
//     console.log('resultIMG', result);
//
//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       setFile(result)
//     }
//   };
//
//
//   const load = async (file) => {
//     const storage = getStorage();
//     const storageRef = ref(storage, 'aaaaa1');
//
//     const blob = await new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.onload = function () {
//         resolve(xhr.response);
//       };
//       xhr.onerror = function (e) {
//         console.log(e);
//         reject(new TypeError("Network request failed"));
//       };
//       xhr.responseType = "blob";
//       xhr.open("GET", file.assets[0].uri, true);
//       xhr.send(null);
//     });
//
//
//     await uploadBytes(storageRef, blob).then((snapshot) => {
//       console.log('Uploaded a blob or file!', snapshot);
//     });
//
//     await blob.close();
//
//
//   }
//
//   const downLoad = () => {
//     const storage = getStorage();
//     const starsRef = ref(storage, 'aaaaa1');
//
// // Get the download URL
//     getDownloadURL(starsRef)
//       .then((url) => {
//         setImage2(url)
//         console.log('IMG URL LOADED', url)
//       })
//       .catch((error) => {
//         switch (error.code) {
//           case 'storage/object-not-found':
//             console.log('File doesn\'t exist')
//             // File doesn't exist
//             break;
//           case 'storage/unauthorized':
//             console.log('User doesn\'t have permission to access the object')
//             // User doesn't have permission to access the object
//             break;
//           case 'storage/canceled':
//             console.log('User canceled the upload')
//             // User canceled the upload
//             break;
//           case 'storage/unknown':
//             console.log('Unknown error occurred, inspect the server response')
//             // Unknown error occurred, inspect the server response
//             break;
//         }
//       });
//   }
//
//   return (
//     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//       <Button title={'loAD imG TO STORAGE'} style={{ marginTop: 30}} onPress={() => load(file)}/>
//
//       <Button title={'Download'} style={{ marginTop: 30}} onPress={downLoad}/>
//       {image2 && <Image source={{ uri: image2 }} style={{ width: 200, height: 200 }} />}
//
//     </View>
//
//
//   );
// }
//
