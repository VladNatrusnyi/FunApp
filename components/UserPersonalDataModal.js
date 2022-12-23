import {
  Image,
  Modal,
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  SafeAreaView, TouchableOpacity
} from "react-native";
import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MemeImgList} from "./CreateMeme/MemeImgList";
import {COLORS} from "../assets/colors";
import MyButton from "./ui/MyButton";
import LightButton from "./ui/LightButton";
import {changeCurrentUserData, getCurrentUserData, setIsOpenUserPersonalDataModal} from "../store/auth/authSlice";
import {setIsOpenMemeListModal} from "../store/create-meme/createMemeSlice";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {USER_LOGOUT} from "../store";
import {getImgUrl} from "../helpers/getImgUrl";
import Preloader from "./ui/Preloader";
import {deleteObject, getStorage, ref} from "firebase/storage";


export default function UserPersonalListModal ({text = '', img = null}) {

  const [name, setName] = useState(text)
  const [photo, setPhoto] = useState(null)
  const [existPhoto, setExistPhoto] = useState(img)

  const dispatch = useDispatch()
  const isOpenUserPersonalDataModal = useSelector(state => state.auth.isOpenUserPersonalDataModal)
  const userData = useSelector(state => state.auth.user)
  const isLoadingChanges = useSelector(state => state.auth.isLoadingChanges)

  const uploadPhoto = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log('resultIMG', result);

    if (!result.canceled) {
      setPhoto(result)
      setExistPhoto('')
    }
  };

  const saveData =  async () => {
    let imgUrl = ''
    if (photo) {
      imgUrl = await getImgUrl(photo, userData.uid)
    } else {
      imgUrl = ''
    }

    console.log('IMG URL', imgUrl)
    if (!text && name) {
      dispatch(getCurrentUserData({name, imgUrl}))
    }

    if (name) {
      dispatch(changeCurrentUserData({name, imgUrl: imgUrl ? imgUrl : existPhoto }))
    }
  }


  const cancelPhoto = () => {
    setPhoto(null)

    const storage = getStorage();

    const desertRef = ref(storage, userData.uid);

    deleteObject(desertRef).then(() => {
      console.log('File deleted successfully')
      setExistPhoto('')
    }).catch((error) => {
      console.log('File deleted error', error)
    });
  }


  return(
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isOpenUserPersonalDataModal}
        onRequestClose={() => {
          dispatch(setIsOpenUserPersonalDataModal(false))
          if (!text) {
            dispatch({type: USER_LOGOUT})
          }
          }
        }
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {
              isLoadingChanges ? <ActivityIndicator size="small" color={COLORS.orange} />
                :
                <View style={{width: 250}}>

                  <SafeAreaView style={styles.form}>
                    {existPhoto || photo && photo.assets[0] ?
                      <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20}}>
                        <View style={{ marginBottom: 20, position: 'relative'}}>

                          <TouchableOpacity style={{position: 'absolute', right: 0,top: 0, zIndex: 20}} onPress={cancelPhoto}>
                            <MaterialIcons name="cancel" size={20} color="lightgray" />
                          </TouchableOpacity>

                          {
                            existPhoto ?
                              <Image
                                style={styles.tinyLogo}
                                source={{
                                  uri: existPhoto,
                                }}
                                resizeMode='cover'
                              />
                              :
                              <Image
                                style={styles.tinyLogo}
                                source={{
                                  uri: photo.assets[0].uri,
                                }}
                                resizeMode='cover'
                              />
                          }
                        </View>

                        <LightButton
                          style={{marginBottom: 15}}
                          clickButton={uploadPhoto}
                          text={'Змінити фото'}
                          iconName={'create-outline'}
                        />
                      </View>
                      :
                      <TouchableOpacity onPress={uploadPhoto} style={{ alignItems: "center"}}>
                        <View style={styles.btnWrap}>
                          <MaterialIcons
                            style={{marginHorizontal: 'auto'}}
                            name="add-photo-alternate"
                            size={32}
                            color={COLORS.orange}
                          />
                        </View>
                      </TouchableOpacity>
                    }


                    <TextInput
                      style={styles.input}
                      placeholder="Введіть ваше ім'я"
                      autoCapitalize="none"
                      keyboardType="default"
                      value={name}
                      onChangeText={(text) => setName(text)}
                    />


                    <MyButton clickButton={saveData} text="Зберегти" bgColor={COLORS.orange}/>
                  </SafeAreaView>

                </View>
            }
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  tinyLogo: {
    width: 150,
    height: 150,
    borderRadius: 100
  },
  form: {
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginTop: 20
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },

  btnWrap: {
    width: 100,
    height: 100,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    borderColor: COLORS.orange,
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: "dashed",
    marginBottom: 20
  }
});
